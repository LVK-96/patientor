import React from "react";
import { Card } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../types";
import DiagnosisCodes from "../components/DiagnosisCodes";

const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  let diagnosisCodes = null;
  if (entry.diagnosisCodes) {
    diagnosisCodes =
      <Card.Description>
        <DiagnosisCodes diagnosisList={entry.diagnosisCodes} />
      </Card.Description>;
  }

  let sickLeave = null;
  if (entry.sickLeave) {
    sickLeave =
      <Card.Description>
        {`Sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
      </Card.Description>;
  }

  return (
    <>
      <Card.Description>
        {`Employer: ${entry.employerName}`}
      </Card.Description>
      {sickLeave}
      {diagnosisCodes}
    </>
  );
};

export default OccupationalEntryDetails;
