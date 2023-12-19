import {
  FunctionField,
  Labeled,
  RaRecord,
  Translate,
  useRecordContext,
  useTranslate,
} from "react-admin";

export interface MultiReferenceInputProps {
  source: string;
  recordRepresentation: (item: any) => string;
}

export const MultiReferenceInput = ({ source, recordRepresentation }: MultiReferenceInputProps) => {
  const translate: Translate = useTranslate();
  const record: RaRecord = useRecordContext();
  const items = record[source];

  return (
    <Labeled source={source}>
      <FunctionField
        render={() =>
          items?.length != null && items?.length < 1
            ? translate("amplicode.not_set")
            : items?.map((item: Record<string, unknown>) => recordRepresentation(item)).join(",")
        }
      />
    </Labeled>
  );
};
