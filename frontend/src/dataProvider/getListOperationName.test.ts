import { expect } from "@jest/globals";
import { getListOperationName } from "./getListOperationName";

describe("getListOperationName", () => {
  it("getListOperationName should return correct operation name for list query", async () => {
    const queryName = getListOperationName("PetDTO");
    expect(queryName).toEqual("petList");
  });
});
