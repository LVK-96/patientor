import React, { Dispatch, SetStateAction } from "react";
import { Field } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, SelectFieldEntry } from "../AddPatientModal/FormField";
import { HospitalEntryFormValues } from "./AddHospitalEntryForm";
import { HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";
import { OccupationalEntryFormValues } from "./AddOccupationalEntryForm";

export type TypeOption = {
  value: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  label: string;
};

export const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "HealthCheck", label: "Health check" }
];

type ValidatorError = { [field: string]: string };
export type EntryToSubmit = HospitalEntryFormValues | OccupationalEntryFormValues | HealthCheckEntryFormValues;

export const requiredErrorMsg = "Field is required";

export const commonFieldValidator = (values: EntryToSubmit, errors: ValidatorError) => {
  if (!values.type) {
    errors.type = requiredErrorMsg;
  }
  if (!values.specialist) {
    errors.specialist = requiredErrorMsg;
  }
  if (!values.date) {
    errors.date = requiredErrorMsg;
  }
  if (!values.description) {
    errors.description = requiredErrorMsg;
  }
  return errors;
};

interface FieldsProps {
  setFormType: Dispatch<SetStateAction<string>>;
}

export const CommonFormFields: React.FC<FieldsProps> = ({ setFormType }) => (
  <>
    <SelectFieldEntry
      label="Type"
      name="type"
      options={typeOptions}
      setFormType={setFormType}
    />
    <Field
      label="Specialist"
      placeholder="Specialist"
      name="specialist"
      component={TextField}
    />
    <Field
      label="Date"
      placeholder="YYYY-MM-DD"
      name="date"
      component={TextField}
    />
    <Field
      label="Description"
      placeholder="Description"
      name="description"
      component={TextField}
    />
  </>
);

interface SubmitProps {
  onCancel: () => void;
  dirty: boolean;
  isValid: boolean;
}

export const SubmitGrid: React.FC<SubmitProps> = ({ onCancel, dirty, isValid }) => (
  <Grid>
    <Grid.Column floated="left" width={5}>
      <Button type="button" onClick={onCancel} color="red">
        Cancel
      </Button>
    </Grid.Column>
    <Grid.Column floated="right" width={5}>
      <Button
        type="submit"
        floated="right"
        color="green"
        disabled={!dirty || !isValid}
      >
        Add
      </Button>
    </Grid.Column>
  </Grid>
);
