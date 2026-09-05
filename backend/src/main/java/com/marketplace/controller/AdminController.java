package com.marketplace.controller;

import com.marketplace.dto.AdminCommandePageDTO;
import com.marketplace.dto.AdminRejectKycRequest;
import com.marketplace.dto.AdminListingDTO;
import com.marketplace.dto.AdminListingPageDTO;
import com.marketplace.dto.AdminStatsDTO;
import com.marketplace.dto.AdminUpdateRoleRequest;
import com.marketplace.dto.AdminUserDTO;
import com.marketplace.dto.AdminUserPageDTO;
import com.marketplace.dto.AdminVersementDTO;
import com.marketplace.model.Remboursement;
import com.marketplace.model.StatutRemboursement;
import com.marketplace.dto.AdminVersementPageDTO;
import com.marketplace.dto.SellerRequestDTO;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.StatutVersement;
import com.marketplace.service.AnimalService;
import com.marketplace.service.PaiementService;
import com.marketplace.service.UserService;
import com.marketplace.service.VersementService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final AnimalService animalService;
    private final PaiementService paiementService;
    private final VersementService versementService;
    private final com.marketplace.service.RemboursementService remboursementService;
    private final com.marketplace.service.PermisService permisService;

    public AdminController(UserService userService, AnimalService animalService,
                            PaiementService paiementService, VersementService versementService,
                            com.marketplace.service.RemboursementService remboursementService,
                            com.marketplace.service.PermisService permisService) {
        this.userService = userService;
        this.animalService = animalService;
        this.paiementService = paiementService;
        this.versementService = versementService;
        this.remboursementService = remboursementService;
        this.permisService = permisService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> stats() {
        return ResponseEntity.ok(userService.getAdminStats());
    }

    @GetMapping("/users")
    public ResponseEntity<AdminUserPageDTO> listUsers(
            @RequestParam(defaultValue = "all") String filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(userService.listUsers(filter, page, size));
    }

    @PatchMapping("/users/{userId}/role")
    public ResponseEntity<AdminUserDTO> updateUserRole(
            @PathVariable Long userId,
            @Valid @RequestBody AdminUpdateRoleRequest request
    ) {
        return ResponseEntity.ok(userService.updateUserRole(userId, request.role()));
    }

    @PostMapping("/users/{userId}/kyc/validate")
    public ResponseEntity<AdminUserDTO> validateKyc(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.validateKyc(userId));
    }

    @PostMapping("/users/{userId}/kyc/reject")
    public ResponseEntity<AdminUserDTO> rejectKyc(
            @PathVariable Long userId,
            @RequestBody(required = false) AdminRejectKycRequest request
    ) {
        return ResponseEntity.ok(userService.rejectKyc(userId));
    }

    @GetMapping("/annonces")
    public ResponseEntity<AdminListingPageDTO> listListings(
            @RequestParam(required = false) AnimalStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(animalService.listAdminListings(status, page, size));
    }

    @PostMapping("/annonces/{animalId}/approuver")
    public ResponseEntity<AdminListingDTO> approveListing(@PathVariable UUID animalId) {
        return ResponseEntity.ok(animalService.publishAdminListing(animalId));
    }

    @PostMapping("/annonces/{animalId}/suspendre")
    public ResponseEntity<AdminListingDTO> suspendListing(@PathVariable UUID animalId) {
        return ResponseEntity.ok(animalService.suspendAdminListing(animalId));
    }

    @GetMapping("/commandes")
    public ResponseEntity<AdminCommandePageDTO> listCommandes(
            @RequestParam(required = false) StatutCommande statut,
            /** Ne montrer que les commandes payees chez l'operateur mais abandonnees chez nous. */
            @RequestParam(defaultValue = "false") boolean orphelins,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(paiementService.listAdminCommandes(statut, orphelins, page, size));
    }

    @GetMapping("/versements")
    public ResponseEntity<AdminVersementPageDTO> listVersements(
            @RequestParam(required = false) StatutVersement statut,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(versementService.listAdminVersements(statut, page, size));
    }

    /**
     * POST /api/admin/versements/{id}/regler-manuellement
     *
     * Enregistre un versement fait a la main par Mobile Money. C'est aujourd'hui
     * le seul chemin operationnel : GeniusPay n'expose pas de transfert sortant.
     */
    @PostMapping("/versements/{versementId}/regler-manuellement")
    public ResponseEntity<AdminVersementDTO> reglerVersementManuellement(
            @PathVariable Long versementId, @RequestBody ReglementRequest body) {
        return ResponseEntity.ok(versementService.reglerManuellement(versementId, body.getReference()));
    }

    // ─── Transporteurs : validation du permis ────────────────────────────────

    /** GET /api/admin/transporteurs/en-attente — permis deposes, pas encore tranches. */
    @GetMapping("/transporteurs/en-attente")
    public ResponseEntity<List<com.marketplace.dto.TransporteurDossierDTO>> transporteursEnAttente() {
        return ResponseEntity.ok(permisService.dossiersEnAttente());
    }

    /**
     * POST /api/admin/transporteurs/{id}/permis/valider
     *
     * Validation humaine, contrairement au KYC qui s'appuie sur une
     * reconnaissance automatique : un faux positif ici confie un animal a
     * quelqu'un que la plateforme aura presente comme fiable.
     */
    @PostMapping("/transporteurs/{transporteurId}/permis/valider")
    public ResponseEntity<com.marketplace.dto.TransporteurDossierDTO> validerPermis(
            @PathVariable Long transporteurId) {
        return ResponseEntity.ok(permisService.valider(transporteurId));
    }

    /** POST /api/admin/transporteurs/{id}/permis/refuser */
    @PostMapping("/transporteurs/{transporteurId}/permis/refuser")
    public ResponseEntity<com.marketplace.dto.TransporteurDossierDTO> refuserPermis(
            @PathVariable Long transporteurId, @RequestBody(required = false) MotifRequest body) {
        return ResponseEntity.ok(permisService.refuser(
                transporteurId, body != null ? body.getMotif() : null));
    }

    @lombok.Data
    public static class MotifRequest {
        private String motif;
    }

    // ─── Remboursements ───────────────────────────────────────────────────────

    /** GET /api/admin/remboursements */
    @GetMapping("/remboursements")
    public ResponseEntity<List<Remboursement>> listRemboursements(
            @RequestParam(required = false) StatutRemboursement statut) {
        return ResponseEntity.ok(remboursementService.listAdmin(statut));
    }

    /** POST /api/admin/remboursements — inscrit une somme due a un acheteur. */
    @PostMapping("/remboursements")
    public ResponseEntity<Remboursement> creerRemboursement(@RequestBody RemboursementRequest body) {
        return ResponseEntity.ok(remboursementService.creerParAdmin(
                body.getCommandeId(), body.getMontant(), body.getMotif(), body.isRemettreEnVente()));
    }

    /** POST /api/admin/remboursements/{id}/regler-manuellement */
    @PostMapping("/remboursements/{remboursementId}/regler-manuellement")
    public ResponseEntity<Remboursement> reglerRemboursementManuellement(
            @PathVariable Long remboursementId, @RequestBody ReglementRequest body) {
        return ResponseEntity.ok(
                remboursementService.reglerManuellement(remboursementId, body.getReference()));
    }

    @lombok.Data
    public static class ReglementRequest {
        /** Reference de la transaction Mobile Money, pour rapprochement. */
        private String reference;
    }

    @lombok.Data
    public static class RemboursementRequest {
        private Long commandeId;
        private java.math.BigDecimal montant;
        private String motif;
        /** Faux quand l'animal est mort ou perdu : il ne doit pas retourner au catalogue. */
        private boolean remettreEnVente;
    }

    @PostMapping("/versements/{versementId}/envoyer")
    public ResponseEntity<AdminVersementDTO> envoyerVersement(@PathVariable Long versementId) {
        return ResponseEntity.ok(versementService.envoyerVersement(versementId));
    }

    @GetMapping("/seller-requests")
    public ResponseEntity<List<SellerRequestDTO>> listSellerRequests() {
        return ResponseEntity.ok(userService.listPendingSellerRequests());
    }

    @PostMapping("/seller-requests/{userId}/approve")
    public ResponseEntity<SellerRequestDTO> approveSellerRequest(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.approveSellerRequest(userId));
    }
}
