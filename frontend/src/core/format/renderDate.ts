import dayjs from "dayjs";

export function renderDate(date: string) {
  return date == null || date === "" ? "" : dayjs(date).format("LL");
}
