package com.company.multishop.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class ApplicationProperties {
    private final FrontendProperties frontend;

    public ApplicationProperties(FrontendProperties frontend) {
        this.frontend = frontend != null ? frontend : new FrontendProperties("");
    }

    public FrontendProperties getFrontend() {
        return frontend;
    }

    public static class FrontendProperties {
        private final String baseUrl;

        public FrontendProperties(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getBaseUrl() {
            return baseUrl;
        }
    }
}
