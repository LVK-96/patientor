import React from "react";
import { v4 as uuidv4 } from "uuid";
import { List } from "semantic-ui-react";

import { useStateValue } from "../state";

const DiagnosisCodes: React.FC<{ diagnosisList: string[] }> = ({ diagnosisList }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <List>
      {diagnosisList.map(c => {
        const d = Object.values(diagnosis).find(d => d.code === c);
        if (d) {
          return (
            <List.Item key={uuidv4()}>
              {`${c} ${d.name}`}
            </List.Item>
          );
        }

        return (
          <List.Item key={uuidv4()}>
            {c}
          </List.Item>
        );
      })}
    </List>
  );
};

export default DiagnosisCodes;
