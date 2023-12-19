package com.company.shopmodel;

import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Import;

@AutoConfiguration
@Import({ShopModelConfiguration.class})
@AutoConfigurationPackage(basePackageClasses = ShopModelConfiguration.class)
@AutoConfigureBefore(JpaRepositoriesAutoConfiguration.class)
public class ShopModelAutoConfiguration {
}
