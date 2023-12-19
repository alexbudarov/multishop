import { expect } from "@jest/globals";
import { filterFieldValues } from "./filterFieldValues";

const fieldValues = {
  birthDate: "2022-06-01",
  identificationNumber: "1232",
  __typename: "PetDTO",
  owner: {
    id: 6,
    firstName: "Fernando",
    lastName: "Mitchell",
    __typename: "OwnerDTO",
  },
  type: {
    id: 1,
    name: "DOG",
    __typename: "PetTypeDTO",
  },
};

const fieldValuesWithArray = {
  birthDate: "2022-06-01",
  identificationNumber: "1232",
  __typename: "PetDTO",
  owner: [
    {
      id: 6,
      firstName: "Fernando",
      lastName: "Mitchell",
      __typename: "OwnerDTO",
    },
    {
      id: 7,
      firstName: "John",
      lastName: "Doe",
      __typename: "OwnerDTO",
    },
  ],
  type: {
    id: 1,
    name: "DOG",
    __typename: "PetTypeDTO",
  },
};

describe("filterFieldValues()", () => {
  it("works with empty sortOutFields", () => {
    let result = filterFieldValues(fieldValues, []);
    expect(result).toEqual(fieldValues);

    result = filterFieldValues(fieldValuesWithArray, []);
    expect(result).toEqual(fieldValuesWithArray);
  });

  it("filter all __typename fields recursively from object", () => {
    const result = filterFieldValues(fieldValues, ["__typename"]);
    expect(result).not.toHaveProperty("__typename");
    expect(result.birthDate).toEqual("2022-06-01");
    expect(result.identificationNumber).toEqual("1232");

    expect(result.type).not.toHaveProperty("__typename");
    expect(result.type).toHaveProperty("id");
    expect(result.type).toHaveProperty("name");

    expect(result.owner).not.toHaveProperty("__typename");
    expect(result.owner).toHaveProperty("id");
    expect(result.owner).toHaveProperty("firstName");
    expect(result.owner).toHaveProperty("lastName");
  });

  it("filter more than one field recursively from object", () => {
    const result = filterFieldValues(fieldValues, ["__typename", "id"]);
    expect(result).not.toHaveProperty("__typename");
    expect(result.birthDate).toEqual("2022-06-01");
    expect(result.identificationNumber).toEqual("1232");

    expect(result.type).not.toHaveProperty("__typename");
    expect(result.type).not.toHaveProperty("id");
    expect(result.type).toHaveProperty("name");

    expect(result.owner).not.toHaveProperty("__typename");
    expect(result.owner).not.toHaveProperty("id");
    expect(result.owner).toHaveProperty("firstName");
    expect(result.owner).toHaveProperty("lastName");
  });

  it("filter more than one field recursively from object that contain array", () => {
    const result = filterFieldValues(fieldValuesWithArray, ["__typename", "id"]);
    expect(result).not.toHaveProperty("__typename");
    expect(result).not.toHaveProperty("id");
    expect(result.birthDate).toEqual("2022-06-01");
    expect(result.identificationNumber).toEqual("1232");

    const owner0 = (result.owner as Array<unknown>)[0];
    const owner1 = (result.owner as Array<unknown>)[1];

    expect(owner0).not.toHaveProperty("id");
    expect(owner0).not.toHaveProperty("__typename");
    expect(owner0).toHaveProperty("firstName");
    expect(owner0).toHaveProperty("lastName");

    expect(owner1).not.toHaveProperty("id");
    expect(owner1).not.toHaveProperty("__typename");
    expect(owner1).toHaveProperty("firstName");
    expect(owner1).toHaveProperty("lastName");

    expect(result.type).not.toHaveProperty("id");
    expect(result.type).not.toHaveProperty("__typename");
    expect(result.type).toHaveProperty("name");
  });
});
