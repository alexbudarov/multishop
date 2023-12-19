import { expect } from "@jest/globals";
import { buildSchema } from "graphql/index";
import { getGraphQLSchema } from "../core/schema/util/getGraphQLSchema";
import { resourceQueryHasPagination } from "./resourceQueryHasPagination";

const MOCK_SCHEMA = buildSchema(`
  scalar Date
  
  type Query {
    ownerListFull: [OwnerDTO]
    ownerList(page: OffsetPageInput): OwnerDTOResultPage
  }
  
  type OwnerDTO {
    firstName: String
    id: ID
    lastName: String
  }
    
  type OwnerDTOResultPage {
    content: [OwnerDTO]
    totalElements: Long!
  }
 
  input OffsetPageInput {
    number: Int!
    size: Int!
  }
  
  scalar Long
`);

jest.mock("../core/schema/util/getGraphQLSchema", () => ({
  getGraphQLSchema: jest.fn(),
}));

describe("resourceQueryHasPagination", function () {
  beforeAll(() => {
    (getGraphQLSchema as any).mockReturnValue(MOCK_SCHEMA);
  });

  it("should return true if resource query result wrapped with 'content'", function () {
    expect(resourceQueryHasPagination("ownerList")).toBe(true);
  });

  it("should return false if there is no pagination in resource query", function () {
    expect(resourceQueryHasPagination("ownerListFull")).toBe(false);
  });

  it("should return false if query not found in schema", function () {
    expect(resourceQueryHasPagination("queryNotExist")).toBe(false);
  });
});
