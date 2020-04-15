import React, { Dispatch, SetStateAction} from "react";
import { Field, Formik, Form } from "formik";

import { NumberField } from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";
import { SubmitGrid, CommonFormFields, commonFieldValidator, requiredErrorMsg } from "./AddEntryFormBase";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
  setFormType: Dispatch<SetStateAction<string>>;
}

export const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel, setFormType }) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        specialist: "",
        date: "",
        description: "",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        let errors: { [field: string]: string } = {};
        errors = commonFieldValidator(values, errors);
        if (!values.healthCheckRating) {
          errors.description = requiredErrorMsg;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <CommonFormFields setFormType={setFormType} />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <SubmitGrid onCancel={onCancel} dirty={dirty} isValid={isValid} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheckEntryForm;
