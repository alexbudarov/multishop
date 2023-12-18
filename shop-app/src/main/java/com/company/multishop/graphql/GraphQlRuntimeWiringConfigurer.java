package com.company.multishop.graphql;

import com.amplicode.core.graphql.scalars.*;
import graphql.scalars.ExtendedScalars;
import graphql.schema.idl.RuntimeWiring;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;
import org.springframework.stereotype.Component;

@Component
public class GraphQlRuntimeWiringConfigurer implements RuntimeWiringConfigurer {
    @Override
    public void configure(RuntimeWiring.Builder builder) {
        builder.scalar(BigIntegerScalar.INSTANCE);
        builder.scalar(LongScalar.INSTANCE);
        builder.scalar(BigDecimalScalar.INSTANCE);
        builder.scalar(ExtendedScalars.Date);
        builder.scalar(ExtendedScalars.Time);
        builder.scalar(ExtendedScalars.DateTime);
        builder.scalar(ExtendedScalars.Url);
        builder.scalar(LocalTimeScalar.INSTANCE);
        builder.scalar(LocalDateTimeScalar.INSTANCE);
        builder.scalar(TimestampScalar.INSTANCE);
        builder.scalar(VoidScalar.INSTANCE);
    }
}
