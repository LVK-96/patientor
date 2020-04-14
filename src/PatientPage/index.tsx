import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Icon, List } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import EntryDetails from "../components/EntryDetails";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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
          {patient.entries.map(e => <EntryDetails key={uuidv4()} entry={e} />)}
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
            {entries}
          </List>
        </Card.Description>
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
        <Card>
          <Card.Content>
            {content}
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
};

export default PatientPage;
