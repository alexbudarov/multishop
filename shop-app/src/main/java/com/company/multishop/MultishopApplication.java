package com.company.multishop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class MultishopApplication {

    public static void main(String[] args) {
        SpringApplication.run(MultishopApplication.class, args);
    }
}
