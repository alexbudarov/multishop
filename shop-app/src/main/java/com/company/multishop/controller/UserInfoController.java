package com.company.multishop.controller;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import jakarta.validation.constraints.NotNull;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Provides GraphQL queries that are required for Amplicode application UI based on React Admin.
 */
@Controller
public class UserInfoController {

    private final AuthenticationInfoProvider authenticationInfoProvider;

    public UserInfoController(AuthenticationInfoProvider authenticationInfoProvider) {
        this.authenticationInfoProvider = authenticationInfoProvider;
    }

    /**
     * Checks whether a user is authenticated or not. If not, then {@link AccessDeniedException} is thrown.
     */
    @PreAuthorize("isAuthenticated()")
    @QueryMapping(name = "checkAuthenticated")
    public void checkAuthenticated() {
        //do nothing if user is authenticated
    }

    /**
     * Provides information about an authenticated user. If there is no authenticated user, then {@link AccessDeniedException} is thrown.
     * By default, {@link AuthenticationInfoProvider} methods are used to get user information like full name and avatar.
     *
     * @param principal principal obtained from {@link org.springframework.security.core.context.SecurityContext}
     * @return {@link UserInfo} with information about an authenticated user.
     */
    @PreAuthorize("isAuthenticated()")
    @QueryMapping("userInfo")
    public UserInfo userInfo(Principal principal) {
        //This implementation to get attribute values for an authenticated user can be changed
        String id = principal.getName();
        String fullName = authenticationInfoProvider.getFullName();
        String avatar = authenticationInfoProvider.getAvatar();

        return new UserInfo(id, fullName, avatar);
    }

    /**
     * Provides information about the authorities of an authenticated user. If there is no authenticated user, then {@link AccessDeniedException} is thrown.
     *
     * @param principal principal obtained from {@link org.springframework.security.core.context.SecurityContext}
     * @return a list that contains the authorities of an authenticated user.
     */
    @PreAuthorize("isAuthenticated()")
    @QueryMapping("userPermissions")
    public List<String> userPermissions(Principal principal) {
        if (principal instanceof Authentication) {
            return ((Authentication) principal)
                    .getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    /**
     * Contains information about user.
     */
    public static class UserInfo {
        /**
         * User identifier.
         */
        @NotNull
        private String id;
        /**
         * User display name, value should be human-readable. E.g. full name or username.
         */
        private String fullName;
        /**
         * User's profile picture as URL or Base64 string.
         */
        private String avatar;

        public UserInfo() {
        }

        public UserInfo(String id, String fullName, String avatar) {
            this.id = id;
            this.fullName = fullName;
            this.avatar = avatar;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getAvatar() {
            return avatar;
        }

        public void setAvatar(String avatar) {
            this.avatar = avatar;
        }
    }
}
