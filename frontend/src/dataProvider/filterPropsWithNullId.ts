export function filterPropsWithNullId<T extends Record<string, unknown>>(data: T): T {
  if (Object(data) !== data) {
    return data;
  }

  if (Array.isArray(data)) {
    return data; // TODO may be support for array too
  }

  return Object.fromEntries(
    Object.entries(data)
      .filter(([_key, value]) => !isNullIdEntry(value))
      .map(([key, value]) => [key, value])
  ) as T;
}

function isNullIdEntry(value: any): boolean {
  if (Object(value) === value && !Array.isArray(value) && value != null) {
    if ("id" in value && value.id == null) {
      return true;
    }
  }
  return false;
}
