package com.company.multishop.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.company.multishop.controller.dto.ProductDto;
import com.company.multishop.controller.dto.ProductMapper;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class ProductController {
    private final ProductRepository crudRepository;
    private final ProductMapper mapper;

    public ProductController(ProductRepository crudRepository, ProductMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
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
    public ResultPage<ProductDto> findAll(
            @Argument ProductFilter filter,
            @Argument("sort") List<ProductOrderByInput> sortInput,
            @Argument("page") OffsetPageInput pageInput
    ) {
        Specification<Product> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Product> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent().stream().map(mapper::toDto).collect(Collectors.toList()), pageData.getTotalElements());
    }

    @QueryMapping(name = "product")
    @Transactional(readOnly = true)
    @NonNull
    public ProductDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateProduct")
    @Transactional
    @NonNull
    public ProductDto update(@Argument @NonNull @Valid ProductDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        Product entity = new Product();
        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
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

    public static class ProductOrderByInput {
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
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static class ProductFilter {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}