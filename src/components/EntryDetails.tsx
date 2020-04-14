import React from "react";
import { Card, Header, Icon } from "semantic-ui-react";

import { Entry } from "../types";
import { assertNever } from "../utils";
import HospitalEntryDetails from "../components/HospitalEntryDetails";
import OccupationalEntryDetails from "../components/OccupationalEntryDetails";
import HealthCheckEntryDetails from "../components/HealthCheckEntryDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  let additionalInfo;
  let correctIcon;
  switch (entry.type) {
    case "Hospital":
      additionalInfo = <HospitalEntryDetails entry={entry} />;
      correctIcon = <Icon name="ambulance" />;
      break;
    case "OccupationalHealthcare":
      additionalInfo = <OccupationalEntryDetails entry={entry} />;
      correctIcon = <Icon name="doctor" />;
      break;
    case "HealthCheck":
      additionalInfo = <HealthCheckEntryDetails entry={entry} />;
      correctIcon = <Icon name="stethoscope" />;
      break;
    default:
      assertNever(entry);
  }

  return (
    <Card>
      <Card.Content>
        <Header size="tiny">
          <div>
            {correctIcon}
          </div>
          <div>
            {`${entry.date}: ${entry.description}`}
          </div>
        </Header>
        {additionalInfo}
      </Card.Content>
    </Card>
  );
};

export default EntryDetails;
