package com.company.shopmodel.calc;

import com.company.shopmodel.entity.Product;
import com.company.shopmodel.entity.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CalcController {

    private final ProductService productService;

    private final ProductRepository productRepository;

    public CalcController(ProductService productService,
                          ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @MutationMapping(name = "inflatePrice")
    public void inflatePrice(@Argument Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        productService.inflatePrice(product);
    }
}