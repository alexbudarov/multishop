import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";
import { renderTimestamp } from "../../format/renderTimestamp";

export const TimestampField = (props: Omit<FunctionFieldProps, "render">) => {
  const { source } = props;
  if (source == null) {
    return null;
  }

  return (
    <FunctionField render={(record: RaRecord) => renderTimestamp(record[source])} {...props} />
  );
};
