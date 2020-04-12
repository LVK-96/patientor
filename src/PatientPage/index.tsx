import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Icon, List } from "semantic-ui-react";

import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

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
        dispatch({ type: "UPDATE_PATIENT", payload: patient});
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
