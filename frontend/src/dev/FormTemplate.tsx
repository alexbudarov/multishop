// @ts-nocheck
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useMemo, useRef, MutableRefObject } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { useFormContext, UseFormReturn } from "react-hook-form";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  RadioButtonGroupInput,
  PasswordInput,
  BooleanInput,
  NumberInput,
  required,
} from "react-admin";

export const FormTemplate = () => {
  /*vtl
    #macro( commonFieldProps $field )
      source="$field.name"
      #if($field.required) isRequired #end
      #if($field.placeholder) placeholder="$field.placeholder" #end
      #if($form.fullWidth) fullWidth #end

      #if(
        $form.labelPosition == 'left'
        || $form.labelPosition == 'top'
      )
        label={false}
      #elseif($field.label)
        label="$field.label"
      #end
      #if($form.labelPosition == 'left')
        helperText={false}
      #elseif($field.helperText)
        helperText="$field.helperText"
      #end
    #end
  */

  /*vtl
    #set($withCommonValidate = true)
    #foreach($action in $form.actions)
      #if ($action.required || $action.validate)
        #set($withCommonValidate = false)
      #end
    #end

    #set($withResetAction = false)
    #foreach($action in $form.actions)
      #if ($action.actionType == 'reset')
        #set($withResetAction = true)
      #end
    #end
  */

  /*vtl #if($withResetAction) */
    const formContextRef = useRef<UseFormReturn<any>>();

    // Used to access the "react-hook-form" library context to get full control over the form
    const FormManager = useMemo(() => function FormManager(props: { formContextRef: MutableRefObject<UseFormReturn<any> | undefined> }) {
      const formContext = useFormContext();

      useEffect(() => {
        props.formContextRef.current = formContext;
      });
    
      return null;
    }, []);
  /*vtl #end */

  /*vtl #if ($withCommonValidate) */
    const validate = useCallback((values/*vtl: Partial<$form.typeName> */) => {
      // TODO validate field values
      const errors: Record<string, string> = {};
      return errors;
    }, []);
  /*vtl #end */
  
  const onSubmit = useCallback((values/*vtl: Partial<$form.typeName> */) => {
    // TODO submit field values
    console.log(values);
  }, []);

  /*vtl #if($form.actions.size() > 0) */
    const toolbar = useMemo(() => {
      return (
        <Stack direction="row" spacing={2}>
          {/*vtl #foreach($action in $form.actions) */}
            <Button
              /*vtl
                #if($!action.formSubmit) variant="contained" type="submit"
                #else
                  onClick={() => {
                    #if($action.actionType == 'reset')
                      formContextRef.current?.reset();
                    #else
                      // TODO your custom action
                    #end
                  }}
                #end
              */
            >
              {/*vtl $action.label */}
            </Button>
          {/*vtl #end */}
        </Stack>
      );
    }, []);
  /*vtl #end */

  return (
    <SimpleForm
      onSubmit={onSubmit}
      /*vtl #if($form.itemsVariableName) defaultValues={$form.itemsVariableName} #end */
      /*vtl #if ($withCommonValidate) */
        validate={validate} 
      /*vtl #end */
      /*vtl #if($form.actions.size() > 0) */
        toolbar={toolbar}
      /*vtl #end */
    >
      {/*vtl #if($form.labelPosition == 'left') */}
        <Grid container spacing={2} alignItems="center">
      {/*vtl #end */}

      {/*vtl #foreach($field in $form.fields)*/}
        {/*vtl #if(!$field.exclude) */}
          {/*vtl #if ($form.labelPosition == 'top') */}
            <InputLabel>
              {/*vtl $field.label */}
            </InputLabel>
          {/*vtl #end */}
          {/*vtl #if ($form.labelPosition == 'left') */}
            <Grid item xs={2}>
              <InputLabel style={{ textAlign: "right" }}>{/*vtl $field.label */}</InputLabel>
            </Grid>
            <Grid item xs={10}>
          {/*vtl #end */}

          {/*vtl #if($field.controlType == "TextInput") */}
            <TextInput
              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #elseif($field.controlType == "TextInputMultiline") */}
            <TextInput
              multiline
              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #elseif($field.controlType == "SelectInput") */}
            <SelectInput
              choices={[
                { id: "choice1", name: "Choice1" },
                { id: "choice2", name: "Choice2" },
              ]}

              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #elseif($field.controlType == "RadioButtonGroupInput") */}
            <RadioButtonGroupInput
              choices={[
                { id: "choice1", name: "Choice1" },
                { id: "choice2", name: "Choice2" },
              ]}

              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #elseif($field.controlType == "PasswordInput") */}
            <PasswordInput
              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #elseif($field.controlType == "NumberInput") */}
            <NumberInput
              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #elseif($field.controlType == "BooleanInput") */}
            <BooleanInput
              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #else */}
            <TextInput
              /*vtl #commonFieldProps($field) */
              /*vtl #if($field.required || $field.validate) */
                validate={[
                  /*vtl #if($field.required) */
                    required(),
                  /*vtl #end */
                  /*vtl #if($field.validate) */
                    (value) => {
                      // TODO validate field value
                      return null
                    },
                  /*vtl #end */
                ]}
              /*vtl #end */
            />
          {/*vtl #end */}

          {/*vtl #if ($form.labelPosition == 'left') */}
            </Grid>
          {/*vtl #end */}
        {/*vtl #end */}
      {/*vtl #end */}

      {/*vtl #if($form.labelPosition == 'left') */}
        </Grid>
      {/*vtl #end */}

      {/*vtl #if($withResetAction) */}
        <FormManager formContextRef={formContextRef} />
      {/*vtl #end */}
    </SimpleForm>
  );
};
