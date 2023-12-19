import { AutocompleteInput, ReferenceInput } from "react-admin";

export interface SingleReferenceInputProps {
  source: string;
  reference: string;
  recordRepresentation: (item: any) => string;
}

export const SingleReferenceInput = (props: SingleReferenceInputProps) => {
  return (
    <ReferenceInput {...props}>
      <AutocompleteInput optionText={props.recordRepresentation} name={props.source} />
    </ReferenceInput>
  );
};
