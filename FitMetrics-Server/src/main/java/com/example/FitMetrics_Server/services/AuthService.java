package com.example.FitMetrics_Server.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.JwtBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    // Retrieve JWT key from application.properties
    @Value("${jwt.secret.key}")
    private String jwtKey;

    public String generateJWT(long id, String email) {
        long now = System.currentTimeMillis();
        Date today = new Date(now);
        SignatureAlgorithm algorithm = SignatureAlgorithm.HS256;

        // Decode the Base64 encoded key
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(jwtKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, algorithm.getJcaName());

        JwtBuilder builder = Jwts.builder()
                .setId(String.valueOf(id)) // Set the user ID
                .setIssuedAt(today)
                .setSubject(email) // Use email as the subject
                .signWith(algorithm, signingKey)
                .setExpiration(new Date(now + 86400000)); // 1 day
        return builder.compact();
    }

    public Claims parseToken(String jwt) {
        // Decode the Base64 encoded key
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(jwtKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(jwt)
                .getBody();
    }
}
