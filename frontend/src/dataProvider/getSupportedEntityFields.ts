import { GraphQLSchema } from "graphql";
import { GraphQLFieldMap, GraphQLInputFieldMap } from "graphql/type";
import { getGraphQLSchema } from "../core/schema/util/getGraphQLSchema";
import { getTypeFields } from "../core/schema/util/getTypeFields";

/**
 * Get list af all fields based on schema type related to passed resource.
 * Filter and return only fields of resource entity, which are supported by data provider.
 *
 * @param resource resource to find type and type fields
 */
export const getSupportedEntityFields = (resource: string): string[] => {
  const SUPPORTED_TYPES = [
    "ID",
    "String",
    "BigDecimal",
    "BigInteger",
    "Boolean",
    "Int",
    "Timestamp",
    "Float",
    "Date",
    "LocalDateTime",
    "LocalTime",
    "Long",
    "DateTime",
    "Time",
    "Url",
  ];

  const schema: GraphQLSchema = getGraphQLSchema();
  const typeFields: GraphQLInputFieldMap | GraphQLFieldMap<any, any> = getTypeFields(
    resource,
    schema
  );

  return Object.keys(typeFields).filter((key: string | number) => {
    let type = typeFields[key].type;

    if ("ofType" in type) {
      type = type.ofType;
    }

    if (!("name" in type)) {
      return false;
    }

    const typeName: string = type.name;
    return SUPPORTED_TYPES.includes(typeName);
  });
};
