import React from "react";
import { Card, Divider } from "semantic-ui-react";

import { HospitalEntry } from "../types";
import DiagnosisCodes from "../components/DiagnosisCodes";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  let diagnosisCodes = null;
  if (entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
    diagnosisCodes =
      <>
        <Divider />
        <Card.Description>
          <DiagnosisCodes diagnosisList={entry.diagnosisCodes} />
        </Card.Description>
      </>;
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
