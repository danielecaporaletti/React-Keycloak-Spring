package com.poc.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.*;
import java.util.stream.Collectors;

public class KeyCloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = (Map<String, Object>) jwt.getClaims().get("realm_access");
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        if(realmAccess != null && !realmAccess.isEmpty()) {
            List<String> roles = (List<String>) realmAccess.get("roles");
            authorities.addAll(roles.stream()
                    .map(roleName -> "ROLE_" + roleName)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList()));
        }
        // Extract scopes from token and add them as authorities
        String scope = (String) jwt.getClaims().get("scope");
        if(scope != null) {
            authorities.addAll(Arrays.stream(scope.split(" "))
                    .map(s -> "SCOPE_" + s)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList()));
        }
        return authorities;
    }
}

