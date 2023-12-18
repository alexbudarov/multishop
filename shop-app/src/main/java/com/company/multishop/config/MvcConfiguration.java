package com.company.multishop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.util.StringUtils.trimLeadingCharacter;
import static org.springframework.util.StringUtils.trimTrailingCharacter;

@Configuration
public class MvcConfiguration {
    private final ApplicationProperties applicationProperties;
    public MvcConfiguration(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }
    @Bean
    public WebMvcConfigurer mvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                String baseUrl = applicationProperties.getFrontend().getBaseUrl();
                if (!StringUtils.hasLength(baseUrl)) {
                    registry.addViewController("/").setViewName("forward:/index.html");
                } else {
                    String normalizedUrl = normalizeUrl(baseUrl);
                    registry.addViewController("/" + normalizedUrl).setViewName("forward:/" + normalizedUrl + "/index.html");
                }
            }

            private String normalizeUrl(String url) {
                return trimTrailingCharacter(trimLeadingCharacter(url, '/'), '/');
            }
        };
    }
}
