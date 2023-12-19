import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";
import { renderLocalTime } from "../../format/renderLocalTime";

export const LocalTimeField = (props: Omit<FunctionFieldProps, "render">) => {
  const { source } = props;
  if (source == null) {
    return null;
  }

  return (
    <FunctionField render={(record: RaRecord) => renderLocalTime(record[source])} {...props} />
  );
};
