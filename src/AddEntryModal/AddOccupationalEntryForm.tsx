import React, { Dispatch, SetStateAction} from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectFieldEntry, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { typeOptions } from "./AddEntryFormBase";
import { useStateValue } from "../state";

export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
  setFormType: Dispatch<SetStateAction<string>>;
}

export const AddOccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel, setFormType }) => {
  const [{ diagnosis }] = useStateValue();
  return ( <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        specialist: "",
        date: "",
        description: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: { startDate: "", endDate: "" }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Employer"
              placeholder=""
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalEntryForm;
