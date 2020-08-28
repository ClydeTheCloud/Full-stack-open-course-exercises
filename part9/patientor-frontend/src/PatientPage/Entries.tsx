import React from "react";
import { Card, List, Divider, Header, Icon } from "semantic-ui-react";
import {
  Entry,
  assertNever,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { useStateValue } from "../state";

type HealthRatingType = "orange" | "red" | "yellow" | "green";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthRating: HealthRatingType[] = ["green", "yellow", "orange", "red"];
  return (
    <div>
      <Header as="h3">Health check</Header>
      <p>
        Health Rating:{" "}
        <Icon color={healthRating[entry.healthCheckRating]} name={"heart"} />
      </p>
    </div>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h3">Hospital entry</Header>
      <p>Discharged on: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <Header as="h3">Occupational Healthcare</Header>
      <p>Employer Name: {entry.employerName} </p>
      {entry.sickLeave && (
        <>
          <p>Sick leave started: {entry.sickLeave.startDate}</p>
          <p>Sick leave ended: {entry.sickLeave.endDate}</p>
        </>
      )}
    </div>
  );
};

let CardColor: "red" | "blue" | "violet";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      CardColor = "red";
      return <Hospital entry={entry} />;
    case "HealthCheck":
      CardColor = "blue";
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      CardColor = "violet";
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ loadedDiagnosisInfo }] = useStateValue();

  return (
    <Card fluid color={CardColor}>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Divider />
        <List horizontal>
          {entry.diagnosisCodes ? (
            entry.diagnosisCodes.map((d) => {
              const diagnosis = loadedDiagnosisInfo.find((l) => l.code === d);
              return (
                <List.Item key={d}>
                  {diagnosis?.code}: {diagnosis?.name}
                </List.Item>
              );
            })
          ) : (
            <List.Item>No diagnoses found</List.Item>
          )}
        </List>
        <Divider />
        <EntryDetails entry={entry} />
      </Card.Content>
    </Card>
  );
};

export default EntryComponent;
