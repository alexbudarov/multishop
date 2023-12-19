package com.company.shopmodel.calc;

import com.company.shopmodel.entity.Product;
import com.company.shopmodel.entity.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void inflatePrice(Product product) {
        product = productRepository.findById(product.getId()).orElseThrow();
        product.setPrice(product.getPrice().multiply(BigDecimal.valueOf(2)));
        productRepository.save(product);
    }
}
