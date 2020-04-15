import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { HospitalEntryFormValues } from "./AddHospitalEntryForm";
import { HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";
import { OccupationalEntryFormValues } from "./AddOccupationalEntryForm";

export type Submit = (values: HospitalEntryFormValues | OccupationalEntryFormValues | HealthCheckEntryFormValues) => void;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: Submit;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onClose={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
