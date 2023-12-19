import { expect } from "@jest/globals";
import { buildSchema } from "graphql/index";
import { getGraphQLSchema } from "../core/schema/util/getGraphQLSchema";
import { getSupportedEntityFields } from "./getSupportedEntityFields";

const MOCK_SCHEMA = buildSchema(`
  scalar Date
  
  type Query {
    petList: [PetDTO]
  }
  
  type PetDTO {
    birthDate: Date
    id: ID
    identificationNumber: String!
    weightInGrams: Int
  }
`);

jest.mock("../core/schema/util/getGraphQLSchema", () => ({
  getGraphQLSchema: jest.fn(),
}));

describe("getSupportedEntityFields", function () {
  it("getSupportedEntityFields should return set of supported fields for query", async () => {
    (getGraphQLSchema as any).mockReturnValue(MOCK_SCHEMA);
    let listFields = getSupportedEntityFields("PetDTO");
    expect(listFields.sort()).toEqual(["birthDate", "id", "identificationNumber", "weightInGrams"]);
  });
});
