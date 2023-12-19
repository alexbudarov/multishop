import dayjs from "dayjs";

export function renderTimestamp(dateTime: string) {
  return dateTime == null || dateTime === ""
    ? ""
    : dayjs.unix(Number(dateTime) / 1000).format("LLL");
}
