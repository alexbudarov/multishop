package com.company.multishop.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.company.shopmodel.calc.ProductService;
import com.company.shopmodel.entity.Product;
import com.company.shopmodel.entity.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class ProductController {
    private final ProductRepository crudRepository;

    private final ProductService productService;

    public ProductController(ProductRepository crudRepository,
                             ProductService productService) {
        this.crudRepository = crudRepository;
        this.productService = productService;
    }

    @MutationMapping(name = "deleteProduct")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Product entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "productList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Product> findAll(
            @Argument ProductFilter filter,
            @Argument("sort") List<ProductOrderByInput> sortInput,
            @Argument("page") OffsetPageInput pageInput
    ) {
        Specification<Product> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Product> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @QueryMapping(name = "product")
    @Transactional(readOnly = true)
    @NonNull
    public Product findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateProduct")
    @Transactional
    @NonNull
    public Product update(@Argument @NonNull @Valid Product input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        return crudRepository.save(input);
    }

    protected Sort createSort(List<ProductOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case NAME:
                            return Sort.Order.by("name").with(direction);
                        case PRICE:
                            return Sort.Order.by("price").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    @MutationMapping(name = "inflatePrice")
    public Product inflatePrice(@Argument Long productId) {
        Product product = crudRepository.findById(productId).orElseThrow();
        productService.inflatePrice(product);
        Product result = crudRepository.findById(productId).orElseThrow();
        return result;
    }

    static class ProductOrderByInput {
        private ProductOrderByProperty property;
        private SortDirection direction;

        public ProductOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(ProductOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {
        ASC,
        DESC
    }

    public enum ProductOrderByProperty {
        NAME,
        PRICE
    }

    protected Specification<Product> createFilter(ProductFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.name != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + filter.name.toLowerCase() + "%"));
                }
                if (filter.priceMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filter.priceMin));
                }
                if (filter.priceMax != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), filter.priceMax));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class ProductFilter {
        private String name;
        private BigDecimal priceMin;
        private BigDecimal priceMax;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public BigDecimal getPriceMin() {
            return priceMin;
        }

        public void setPriceMin(BigDecimal priceMin) {
            this.priceMin = priceMin;
        }

        public BigDecimal getPriceMax() {
            return priceMax;
        }

        public void setPriceMax(BigDecimal priceMax) {
            this.priceMax = priceMax;
        }
    }
}