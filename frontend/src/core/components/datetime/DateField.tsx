import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";
import { renderDate } from "../../format/renderDate";

export const DateField = (props: Omit<FunctionFieldProps, "render">) => {
  const { source } = props;
  if (source == null) {
    return null;
  }

  return <FunctionField render={(record: RaRecord) => renderDate(record[source])} {...props} />;
};
