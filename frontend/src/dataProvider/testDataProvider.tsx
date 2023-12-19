import { DataProvider, testDataProvider as raTestDataProvider } from "ra-core";
import { GetOneResult } from "react-admin";

export const defaultTestRecordId: string = "100";
export const testDataProvider: DataProvider = raTestDataProvider({
  getOne: () => Promise.resolve({ data: { id: defaultTestRecordId } } as GetOneResult),
  getList: () => Promise.resolve({ data: [], total: 0 }),
});
