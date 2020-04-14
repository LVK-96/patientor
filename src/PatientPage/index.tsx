import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Icon, List, Divider, Button } from "semantic-ui-react";

import { useStateValue, updatePatient, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient = Object.values(patients).find((p) => p.id === id);
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if(!!patient && !patient.ssn)
      fetchPatientInfo();
  }, [dispatch, id, patient]);

  const submitNewEntry = async (values: EntryFormValues) => {
    if (patient) {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`, values
        );
        console.log(newEntry);
        dispatch(addEntry(newEntry, patient.id));
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
  };

  let content;
  if (patient) {
    let correctIcon;
    switch (patient.gender) {
      case "male":
        correctIcon = <Icon name="man" />;
        break;
      case "female":
        correctIcon = <Icon name="woman" />;
        break;
      default:
        correctIcon = <Icon name="other gender" />;
    }

    let entries = null;
    if (patient.entries) {
      entries =
        <>
          {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
        </>;
    }

    content =
      <>
        <Card.Header>
          {patient.name} {correctIcon}
        </Card.Header>
        <Card.Description>
          <List>
            <List.Item>{patient.occupation}</List.Item>
            <List.Item>{patient.ssn}</List.Item>
          </List>
        </Card.Description>
        <Divider />
        <Card.Group centered={true}>
          {entries}
        </Card.Group>
      </>;
  } else {
    content =
      <>
        <Card.Header>
          Patient Not Found
        </Card.Header>
      </>;
  }

  return (
    <div className="App">
      <Container textAlign="left">
        <Card fluid={true}>
          <Card.Content>
            {content}
          </Card.Content>
        </Card>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={openModal}>Add a New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientPage;
