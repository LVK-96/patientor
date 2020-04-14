import React from "react";
import { Card } from "semantic-ui-react";

import { HospitalEntry } from "../types";
import DiagnosisCodes from "../components/DiagnosisCodes";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  let diagnosisCodes = null;
  if (entry.diagnosisCodes) {
    diagnosisCodes =
      <Card.Description>
        <DiagnosisCodes diagnosisList={entry.diagnosisCodes} />
      </Card.Description>;
  }

  return (
    <>
      <Card.Description>
        {`Discharge: ${entry.discharge.date} - ${entry.discharge.criteria}`}
      </Card.Description>
      {diagnosisCodes}
    </>
  );
};

export default HospitalEntryDetails;
