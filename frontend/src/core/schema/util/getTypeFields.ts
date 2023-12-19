import { GraphQLSchema } from "graphql";

export function getTypeFields(typeName: string, schema: GraphQLSchema) {
  const entityType = schema.getTypeMap()[typeName];

  if (entityType == null) {
    throw new Error(`Can't get 'entityType' by typeName '${typeName}' from schema`);
  }

  if (!("getFields" in entityType)) {
    throw new Error(`Can't get fields from '${entityType}', no 'getFields' method in type`);
  }

  return entityType.getFields();
}
