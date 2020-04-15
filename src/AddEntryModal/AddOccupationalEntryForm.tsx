import React, { Dispatch, SetStateAction} from "react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { SubmitGrid, CommonFormFields, commonFieldValidator, requiredErrorMsg } from "./AddEntryFormBase";
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
        let errors: { [field: string]: string } = {};
        errors = commonFieldValidator(values, errors);
        if (!values.employerName) {
          errors.employerName = requiredErrorMsg;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonFormFields setFormType={setFormType} />
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
            <SubmitGrid onCancel={onCancel} dirty={dirty} isValid={isValid} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalEntryForm;
