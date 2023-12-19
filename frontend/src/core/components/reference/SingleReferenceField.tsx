import { FunctionField, FunctionFieldProps, RaRecord } from "react-admin";

export interface SingleReferenceFieldProps extends Omit<FunctionFieldProps, "render"> {
  recordRepresentation: (item: Record<string, unknown>) => string;
}

export const SingleReferenceField = (props: SingleReferenceFieldProps) => {
  const { source } = props;

  if (source == null) {
    return null;
  }

  const { recordRepresentation, ...funcFieldProps } = props;

  return (
    <FunctionField
      render={(record: RaRecord) => recordRepresentation(record[source])}
      {...funcFieldProps}
    />
  );
};
