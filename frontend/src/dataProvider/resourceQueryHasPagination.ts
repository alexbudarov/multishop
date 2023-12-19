import { GraphQLSchema } from "graphql";
import { getGraphQLSchema } from "../core/schema/util/getGraphQLSchema";

export function resourceQueryHasPagination(operationName: string): boolean {
  const schema: GraphQLSchema = getGraphQLSchema();
  let operationType = schema.getQueryType()?.getFields()[operationName]?.type;

  if (operationType == null) {
    return false;
  }

  // type could be wrapped for example with GraphQLNonNull, we need unwrap it
  if ("ofType" in operationType) {
    operationType = operationType.ofType;
  }

  if (!("getFields" in operationType)) {
    return false;
  }

  // define pagination by 'operationType': if 'operationType' wrapped with 'content',
  // and contains only 'content' and 'totalElements' fields - this is pagination query

  const resultFieldNames = Object.keys(operationType.getFields());
  return (
    resultFieldNames.length === 2 &&
    resultFieldNames.includes("content") &&
    resultFieldNames.includes("totalElements")
  );
}
