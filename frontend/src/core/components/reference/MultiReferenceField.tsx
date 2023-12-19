import {
  FunctionField,
  FunctionFieldProps,
  RaRecord,
  Translate,
  useRecordContext,
  useTranslate,
} from "react-admin";

export interface MultiReferenceFieldProps extends Omit<FunctionFieldProps, "render"> {
  recordRepresentation: (item: Record<string, unknown>) => string;
}

export const MultiReferenceField = (props: MultiReferenceFieldProps) => {
  const translate: Translate = useTranslate();

  const { source } = props;
  const record: RaRecord = useRecordContext();

  if (source == null) {
    return null;
  }
  const items = record[source];
  const { recordRepresentation, ...funcFieldProps } = props;

  return (
    <FunctionField
      render={() =>
        items?.length != null && items?.length < 1
          ? translate("amplicode.not_set")
          : items?.map((item: Record<string, unknown>) => recordRepresentation(item)).join(",")
      }
      {...funcFieldProps}
    />
  );
};
