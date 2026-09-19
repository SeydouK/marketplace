package com.marketplace.service;

import com.marketplace.dto.SellerRequestDTO;
import com.marketplace.dto.AdminStatsDTO;
import com.marketplace.dto.AdminUserDTO;
import com.marketplace.dto.AdminUserPageDTO;
import com.marketplace.dto.StoredFileDTO;
import com.marketplace.dto.MoyenRetraitDTO;
import com.marketplace.dto.UserProfileDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.UnauthorizedException;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.KycStatus;
import com.marketplace.model.Role;
import com.marketplace.model.OperateurPayout;
import com.marketplace.model.User;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.AnimalSellerRepository;
import com.marketplace.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final AnimalSellerRepository animalSellerRepository;
    private final AnimalRepository animalRepository;
    private final FileStorageService fileStorageService;
    /** Uniquement pour savoir si les versements sont ouverts — aucun appel sortant d'ici. */
    private final GeniusPayService geniusPayService;

    public UserService(
            UserRepository userRepository,
            AnimalSellerRepository animalSellerRepository,
            AnimalRepository animalRepository,
            FileStorageService fileStorageService,
            GeniusPayService geniusPayService
    ) {
        this.userRepository = userRepository;
        this.animalSellerRepository = animalSellerRepository;
        this.animalRepository = animalRepository;
        this.fileStorageService = fileStorageService;
        this.geniusPayService = geniusPayService;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || "anonymousUser".equals(authentication.getName())) {
            throw new UnauthorizedException("Utilisateur non authentifie");
        }
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UnauthorizedException("Utilisateur introuvable"));
    }

    public Optional<User> getCurrentUserIfAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || "anonymousUser".equals(authentication.getName())) {
            return Optional.empty();
        }

        return userRepository.findByEmail(authentication.getName());
    }

    @Transactional(readOnly = true)
    public UserProfileDTO getCurrentProfile() {
        return toUserProfile(getCurrentUser());
    }

    @Transactional
    public UserProfileDTO updateCurrentProfile(String name) {
        User current = getCurrentUser();
        if (!StringUtils.hasText(name)) {
            throw new BadRequestException("Le nom ne peut pas être vide.");
        }
        current.setName(name.trim());
        userRepository.save(current);
        return toUserProfile(current);
    }

    @Transactional
    public String updateCurrentAvatar(MultipartFile avatar) {
        if (avatar == null || avatar.isEmpty()) {
            throw new BadRequestException("Aucun fichier reçu.");
        }
        User current = getCurrentUser();
        StoredFileDTO stored = fileStorageService.store(avatar, "avatars");
        current.setAvatarUrl(stored.getUrl());
        userRepository.save(current);
        return stored.getUrl();
    }

    @Transactional
    public UserProfileDTO requestSellerAccess() {
        User current = getCurrentUser();

        if (current.getRole() != Role.ACHETEUR && current.getRole() != Role.ACHETEUR) {
            throw new BadRequestException("Seuls les comptes acheteur peuvent demander l'acces vendeur.");
        }

        if (current.isDevenirVendeur()) {
            throw new BadRequestException("Votre demande pour devenir vendeur est deja en attente.");
        }

        current.setDevenirVendeur(true);
        userRepository.save(current);
        return toUserProfile(current);
    }
    

    // ── Moyen de retrait ────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public MoyenRetraitDTO getMoyenRetrait() {
        return toMoyenRetrait(getCurrentUser());
    }

    /**
     * Enregistre ou remplace la destination de retrait du vendeur.
     *
     * Aucune verification de propriete du numero : la plateforme n'a pas les
     * moyens de la faire, et l'operateur, lui, refusera un compte inexistant.
     * Le risque reel est la faute de frappe vers un numero valide d'un tiers —
     * c'est pourquoi le changement est trace et la destination figee dans chaque
     * versement au moment de l'envoi.
     */
    @Transactional
    public MoyenRetraitDTO updateMoyenRetrait(OperateurPayout operateur, String numero) {
        User current = getCurrentUser();
        // Espaces, points et tirets retires : « 07 00 00 00 00 » et « 0700000000 »
        // designent le meme compte, et les garder ferait echouer la comparaison qui
        // detecte un changement de destination.
        String normalise = numero == null ? null : numero.replaceAll("[ .-]", "");

        if (normalise == null || normalise.isBlank()) {
            throw new BadRequestException("Renseignez le numero a crediter.");
        }

        boolean changement = current.getPayoutOperateur() != operateur
                || !normalise.equals(current.getPayoutNumero());

        current.setPayoutOperateur(operateur);
        current.setPayoutNumero(normalise);
        userRepository.save(current);

        if (changement) {
            // Trace volontaire : une modification de destination de retrait est le
            // geste qu'on veut pouvoir dater si de l'argent part au mauvais endroit.
            log.info("Moyen de retrait modifie par l'utilisateur {} : operateur {}.",
                    current.getId(), operateur);
        }
        return toMoyenRetrait(current);
    }

    private MoyenRetraitDTO toMoyenRetrait(User user) {
        OperateurPayout operateur = user.getPayoutOperateur();
        return new MoyenRetraitDTO(
                operateur,
                user.getPayoutNumero(),
                operateur != null ? operateur.getLibelle() : null,
                operateur != null && user.getPayoutNumero() != null && !user.getPayoutNumero().isBlank(),
                geniusPayService.versementsOperationnels());
    }

    private UserProfileDTO toUserProfile(User current) {
        long animalsCount = animalSellerRepository.countBySeller(current);
        long pendingHealthValidationCount = isHealthAgent(current.getRole())
                ? animalRepository.countByStatus(AnimalStatus.EN_ATTENTE)
                  + animalRepository.countByStatus(AnimalStatus.INDISPONIBLE)
                : 0;
    
        return new UserProfileDTO(
                current.getId(), current.getName(), current.getEmail(),
                current.getRole(), current.isEmailVerified(), current.getKycStatus(),
                current.isDevenirVendeur(), animalsCount, pendingHealthValidationCount,
                current.getAvatarUrl()
        );
    }

    @Transactional(readOnly = true)
    public List<SellerRequestDTO> listPendingSellerRequests() {
        ensureAdminRole(getCurrentUser());

        return userRepository.findByDevenirVendeurTrueOrderByUpdatedAtDesc()
                .stream()
                .filter(user -> !isSellerRole(user.getRole()))
                .map(this::toSellerRequestDto)
                .toList();
    }

    @Transactional
    public SellerRequestDTO approveSellerRequest(Long userId) {
        ensureAdminRole(getCurrentUser());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("Utilisateur introuvable."));

        if (!user.isDevenirVendeur()) {
            throw new BadRequestException("Cet utilisateur n'a pas de demande vendeur en attente.");
        }

        user.setRole(Role.VENDEUR);
        user.setDevenirVendeur(false);
        userRepository.save(user);
        return toSellerRequestDto(user);
    }

    @Transactional(readOnly = true)
    public AdminStatsDTO getAdminStats() {
        ensureAdminRole(getCurrentUser());
        return new AdminStatsDTO(
                userRepository.count(),
                userRepository.countByKycStatusIn(pendingKycStatuses()),
                animalRepository.countByStatus(AnimalStatus.DISPONIBLE),
                0L
        );
    }

    @Transactional(readOnly = true)
    public AdminUserPageDTO listUsers(String filter, int page, int size) {
        ensureAdminRole(getCurrentUser());

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);
        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                Sort.by(Sort.Direction.DESC, "updatedAt")
        );

        Page<User> users = resolveUserPage(filter, pageable);
        return new AdminUserPageDTO(
                users.getContent().stream().map(this::toAdminUserDto).toList(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.getNumber()
        );
    }

    @Transactional
    public AdminUserDTO updateUserRole(Long userId, Role role) {
        ensureAdminRole(getCurrentUser());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("Utilisateur introuvable."));

        user.setRole(role);
        if (isSellerRole(role)) {
            user.setDevenirVendeur(false);
        }
        userRepository.save(user);
        return toAdminUserDto(user);
    }

    @Transactional
    public AdminUserDTO validateKyc(Long userId) {
        ensureAdminRole(getCurrentUser());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("Utilisateur introuvable."));
        user.setKycStatus(KycStatus.VALIDATED);
        user.setBadgeVerifie(true);
        userRepository.save(user);
        return toAdminUserDto(user);
    }

    @Transactional
    public AdminUserDTO rejectKyc(Long userId) {
        ensureAdminRole(getCurrentUser());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("Utilisateur introuvable."));
        user.setKycStatus(KycStatus.REJECTED);
        user.setBadgeVerifie(false);
        userRepository.save(user);
        return toAdminUserDto(user);
    }

    private Page<User> resolveUserPage(String filter, Pageable pageable) {
        if ("pending-kyc".equals(filter)) {
            return userRepository.findByKycStatusIn(pendingKycStatuses(), pageable);
        }

        try {
            Role role = Role.valueOf(filter);
            return userRepository.findByRole(role, pageable);
        } catch (RuntimeException ignored) {
            return userRepository.findAll(pageable);
        }
    }

    private List<KycStatus> pendingKycStatuses() {
        return List.of(KycStatus.PENDING, KycStatus.CNI_UPLOADED, KycStatus.CNI_VERIFIED);
    }

    private AdminUserDTO toAdminUserDto(User user) {
        return new AdminUserDTO(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole(),
                user.isEmailVerified(),
                user.getKycStatus(),
                user.isDevenirVendeur(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    private SellerRequestDTO toSellerRequestDto(User user) {
        return new SellerRequestDTO(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole(),
                user.isEmailVerified(),
                user.getKycStatus(),
                user.isDevenirVendeur(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    private boolean isSellerRole(Role role) {
        return role == Role.VENDEUR || role == Role.ADMIN;
    }

    private void ensureAdminRole(User user) {
        if (user.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
    }

    private boolean isHealthAgent(Role role) {
        return role == Role.ANADER || role == Role.VETERINAIRE || role == Role.ADMIN;
    }
}
