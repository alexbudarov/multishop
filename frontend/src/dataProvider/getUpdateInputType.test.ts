import { expect } from "@jest/globals";
import { getUpdateInputType } from "./getUpdateInputType";

describe("getUpdateInputType", () => {
  it("getUpdateInputType", async () => {
    expect(getUpdateInputType("PetDTO")).toEqual("PetInputDTO");
    expect(getUpdateInputType("Owner")).toEqual("OwnerInput");
  });
});
