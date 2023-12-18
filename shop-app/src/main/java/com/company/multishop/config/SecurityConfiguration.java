package com.company.multishop.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.amplicode.core.auth.UserDetailsAuthenticationInfoProvider;
import com.amplicode.core.security.Authorities;
import com.amplicode.core.security.UnauthorizedStatusAuthenticationEntryPoint;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationFailureHandler;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationSuccessHandler;
import com.amplicode.core.security.formlogin.FormLoginLogoutSuccessHandler;
import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

    private final String adminUsername;
    private final String adminPassword;

    public SecurityConfiguration(@Value("${app.security.in-memory.admin.username}") String adminUsername,
                                 @Value("${app.security.in-memory.admin.password}") String adminPassword) {
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new FormLoginAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new FormLoginAuthenticationFailureHandler();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new FormLoginLogoutSuccessHandler();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new UnauthorizedStatusAuthenticationEntryPoint();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Form Login
        http.formLogin(formLogin -> formLogin
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler())
                .permitAll());
        //Exception handling
        http.exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(authenticationEntryPoint()));
        //Logout
        http.logout(logout -> logout
                .logoutSuccessHandler(logoutSuccessHandler()));
        //Authorize
        http.authorizeHttpRequests(authorization -> authorization
                .dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll()
                .requestMatchers("/", "/index.html", "/assets/**").permitAll()
                .requestMatchers("/api/addon/**").authenticated()
                .requestMatchers("/graphql").permitAll()
                .requestMatchers("/graphql/**").permitAll());
        //CORS
        http.cors(withDefaults());
        //CSRF
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.builder()
                .username(adminUsername)
                .password(adminPassword)
                .authorities("ROLE_ADMIN", Authorities.FULL_ACCESS)
                .build();

        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public AuthenticationInfoProvider authenticationInfoProvider() {
        return new UserDetailsAuthenticationInfoProvider();
    }
}
