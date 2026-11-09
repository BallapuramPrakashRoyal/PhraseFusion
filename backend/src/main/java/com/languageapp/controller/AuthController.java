package com.languageapp.controller;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors-origin:http://localhost:5173}")
public class AuthController {
    private static final Pattern EMAIL = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final int SESSION_DAYS = 30;

    private final JdbcTemplate jdbc;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@RequestBody RegisterRequest request) {
        String firstName = clean(request.firstName());
        String lastName = clean(request.lastName());
        String email = clean(request.email()).toLowerCase();
        validateRegistration(firstName, lastName, email, request.password());
        try {
            long userId = jdbc.queryForObject(
                    "INSERT INTO app_users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?) RETURNING id",
                    Long.class, firstName, lastName, email, passwordEncoder.encode(request.password()));
            return createSession(userId, firstName, lastName, email);
        } catch (DuplicateKeyException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with that email already exists");
        }
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String email = clean(request.email()).toLowerCase();
        if (!EMAIL.matcher(email).matches() || request.password() == null || request.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid email and password");
        }
        UserRecord user = jdbc.query("SELECT id, first_name, last_name, email, password_hash FROM app_users WHERE email = ?",
                (rs, row) -> new UserRecord(rs.getLong("id"), rs.getString("first_name"), rs.getString("last_name"),
                        rs.getString("email"), rs.getString("password_hash")), email)
                .stream().findFirst().orElseThrow(() -> invalidCredentials());
        if (!passwordEncoder.matches(request.password(), user.passwordHash())) {
            throw invalidCredentials();
        }
        return createSession(user.id(), user.firstName(), user.lastName(), user.email());
    }

    @GetMapping("/me")
    public UserResponse me(@RequestHeader(value = "Authorization", required = false) String authorization) {
        UserRecord user = authenticatedUser(authorization);
        return new UserResponse(user.id(), user.firstName(), user.lastName(), user.email());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(@RequestHeader(value = "Authorization", required = false) String authorization) {
        String token = bearerToken(authorization);
        if (token != null) {
            jdbc.update("DELETE FROM auth_sessions WHERE token = ?", token);
        }
    }

    private AuthResponse createSession(long userId, String firstName, String lastName, String email) {
        String token = UUID.randomUUID().toString() + UUID.randomUUID();
        OffsetDateTime expiresAt = OffsetDateTime.now(ZoneOffset.UTC).plusDays(SESSION_DAYS);
        jdbc.update("DELETE FROM auth_sessions WHERE user_id = ? OR expires_at < CURRENT_TIMESTAMP", userId);
        jdbc.update("INSERT INTO auth_sessions (token, user_id, expires_at) VALUES (?, ?, ?)", token, userId, expiresAt);
        return new AuthResponse(token, new UserResponse(userId, firstName, lastName, email));
    }

    private UserRecord authenticatedUser(String authorization) {
        String token = bearerToken(authorization);
        if (token == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        return jdbc.query("SELECT u.id, u.first_name, u.last_name, u.email, u.password_hash " +
                        "FROM auth_sessions s JOIN app_users u ON u.id = s.user_id " +
                        "WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP",
                (rs, row) -> new UserRecord(rs.getLong("id"), rs.getString("first_name"), rs.getString("last_name"),
                        rs.getString("email"), rs.getString("password_hash")), token)
                .stream().findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired"));
    }

    private static String bearerToken(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) return null;
        return authorization.substring(7).trim();
    }

    private static void validateRegistration(String firstName, String lastName, String email, String password) {
        if (firstName.length() < 2 || firstName.length() > 80 || lastName.length() < 2 || lastName.length() > 80) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "First and last name must be 2–80 characters");
        }
        if (!EMAIL.matcher(email).matches()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid email address");
        }
        if (password == null || password.length() < 8 || password.length() > 72 ||
                !password.matches(".*[A-Z].*") || !password.matches(".*[a-z].*") ||
                !password.matches(".*\\d.*") || !password.matches(".*[^A-Za-z0-9].*")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be 8–72 characters with uppercase, lowercase, number, and symbol");
        }
    }

    private static String clean(String value) {
        return value == null ? "" : value.trim();
    }

    private static ResponseStatusException invalidCredentials() {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    public record RegisterRequest(String firstName, String lastName, String email, String password) {}
    public record LoginRequest(String email, String password) {}
    public record AuthResponse(String token, UserResponse user) {}
    public record UserResponse(long id, String firstName, String lastName, String email) {}
    private record UserRecord(long id, String firstName, String lastName, String email, String passwordHash) {}
}
