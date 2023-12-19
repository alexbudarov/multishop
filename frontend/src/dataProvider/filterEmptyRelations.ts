/**
 * Filter empty relation objects (when relation value not selected) before sending data to server.
 * For example data object
 * {
 *   identificationNumber: 333,
 *   owner: {id: undefined}
 * }
 *
 * Before sending to server, should be transformed to
 * {
 *   identificationNumber: 333,
 * }
 *
 * @param data - data to be filtered
 */
export const filterEmptyRelations = <T extends Record<string, unknown>>(data: T): T => {
  // do nothing, if data is not Object
  if (Object(data) !== data) {
    return data;
  }

  Object.keys(data).forEach((key: string): void => {
    // if data[key] is Object, not scalar - it is relation object
    if (Object(data[key]) === data[key]) {
      const relationObj: Record<string, unknown> = data[key] as Record<string, unknown>;
      // delete relation object form data, if id of relation object is not set
      if (relationObj.id == null) {
        delete data[key];
      }
    }
  });

  return data;
};
