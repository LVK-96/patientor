import React, { Dispatch, SetStateAction} from "react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { SubmitGrid, CommonFormFields, commonFieldValidator, requiredErrorMsg } from "./AddEntryFormBase";
import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
  setFormType: Dispatch<SetStateAction<string>>;
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel, setFormType }) => {
  const [{ diagnosis }] = useStateValue();
  return ( <Formik
      initialValues={{
        type: "Hospital",
        specialist: "",
        date: "",
        description: "",
        discharge: { date: "", criteria: "" },
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        let errors: { [field: string]: string } = {};
        errors = commonFieldValidator(values, errors);
        if (!values.discharge.date) {
          errors.dischargeDate = requiredErrorMsg;
        }
        if (!values.discharge.criteria) {
          errors.dischargeCriteria = requiredErrorMsg;
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
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <SubmitGrid onCancel={onCancel} dirty={dirty} isValid={isValid} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;
