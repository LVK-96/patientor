import React, { useState } from "react";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";

import { Submit } from "./index";

interface Props {
  onClose: () => void;
  onSubmit: Submit;
}

export type TypeOption = {
  value: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  label: string;
};

export const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "HealthCheck", label: "Health check" }
];

export const AddEntryFormBase: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [formType, setFormType] = useState("Hospital");
  switch (formType) {
    case "Hospital":
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} setFormType={setFormType} />;
    case "OccupationalHealthcare":
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} setFormType={setFormType} />;
    case "HealthCheck":
      return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} setFormType={setFormType} />;
    default:
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} setFormType={setFormType} />;
  }
};

export default AddEntryFormBase;
