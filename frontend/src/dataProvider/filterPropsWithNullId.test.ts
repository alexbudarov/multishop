import { filterPropsWithNullId } from "./filterPropsWithNullId";

describe("filterPropsWithNullId()", () => {
  const data = {
    id: "15",
    identificationNumber: "12246",
    description: {
      id: null,
    },
    tags: [],
    diseases: [],
  };

  it("should filter prop with null id", function () {
    const res: any = filterPropsWithNullId(data);
    expect(res.tags.length).toEqual(0);
    expect(res.diseases.length).toEqual(0);
    expect(res.id).toEqual("15");
    expect(res.description).toBeUndefined();
  });
});
