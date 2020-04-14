import React from "react";
import { Card } from "semantic-ui-react";

import { HealthCheckEntry } from "../types";
import HealthRatingBar from "./HealthRatingBar";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  console.log(entry.healthCheckRating);
  return (
    <>
      <Card.Description>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Card.Description>
    </>
  );
};

export default HealthCheckEntryDetails;
