package com.marketplace.security;

import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.MotDePasseService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user)
        );
    }

    /**
     * Charge le compte d'un jeton de session, ou null si ce jeton a ete revoque.
     *
     * Un jeton emis avant le dernier changement de mot de passe est refuse :
     * reinitialiser un mot de passe vole doit deconnecter le voleur, pas
     * attendre l'expiration de sa session. Une seule lecture du compte suffit
     * aux deux controles.
     */
    public UserDetails loadUserForToken(String email, java.util.Date emisLe) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null || !MotDePasseService.sessionToujoursValide(user, emisLe)) {
            return null;
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user)
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }
}
