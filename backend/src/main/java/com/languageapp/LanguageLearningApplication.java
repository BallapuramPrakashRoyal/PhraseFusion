package com.languageapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class LanguageLearningApplication {
    public static void main(String[] args) {
        normalizeDatabaseConfiguration();
        SpringApplication.run(LanguageLearningApplication.class, args);
    }

    private static void normalizeDatabaseConfiguration() {
        String configuredUrl = firstNonBlank(
                System.getenv("DB_URL"),
                System.getenv("DATABASE_URL")
        );
        if (configuredUrl == null) {
            return;
        }

        String uriValue = configuredUrl.startsWith("jdbc:")
                ? configuredUrl.substring("jdbc:".length())
                : configuredUrl;

        if (!uriValue.startsWith("postgresql://") && !uriValue.startsWith("postgres://")) {
            throw new IllegalStateException("DB_URL must be a PostgreSQL connection URL");
        }

        URI databaseUri = URI.create(uriValue);
        if (databaseUri.getHost() == null || databaseUri.getPath() == null
                || databaseUri.getPath().equals("/")) {
            throw new IllegalStateException("DB_URL must include a PostgreSQL host and database name");
        }

        String userInfo = databaseUri.getUserInfo();
        if (userInfo != null && userInfo.contains(":")) {
            String[] credentials = userInfo.split(":", 2);
            System.setProperty(
                    "spring.datasource.username",
                    URLDecoder.decode(credentials[0], StandardCharsets.UTF_8)
            );
            System.setProperty(
                    "spring.datasource.password",
                    URLDecoder.decode(credentials[1], StandardCharsets.UTF_8)
            );
        }

        StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                .append(databaseUri.getHost());
        if (databaseUri.getPort() > 0) {
            jdbcUrl.append(':').append(databaseUri.getPort());
        }
        jdbcUrl.append(databaseUri.getPath());
        if (databaseUri.getQuery() != null) {
            jdbcUrl.append('?').append(databaseUri.getQuery());
        }

        System.setProperty("spring.datasource.url", jdbcUrl.toString());
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }
}
