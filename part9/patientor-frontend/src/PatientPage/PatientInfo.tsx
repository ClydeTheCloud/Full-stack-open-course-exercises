import React from "react";
import axios from "axios";
import {
  Container,
  Header,
  Image,
  Segment,
  List,
  Icon,
} from "semantic-ui-react";

import { useStateValue, newPatientInfo } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import EntryComponent from "./Entries";

type Props = {
  patientId: string;
};

const PatientInfo: React.FC<Props> = ({ patientId }) => {
  const [{ loadedPatientsInfo }, dispatch] = useStateValue();

  const fetchPatientInfo = async (id: string) => {
    const { data: patientInfo } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    dispatch(newPatientInfo(patientInfo));
  };

  const getPatientInfo = () => {
    const infoFromCache = Object.values(loadedPatientsInfo).find(
      (p) => p.id === patientId
    );
    if (!infoFromCache) {
      fetchPatientInfo(patientId);
    }
    return infoFromCache;
  };

  const patientInfo = getPatientInfo();

  if (!patientInfo) {
    return <p>Loading...</p>;
  }

  const convertBirthDateToKeanuSize = () => {
    const parseAndAdd = patientInfo.dateOfBirth
      ? parseInt(patientInfo.dateOfBirth.substr(0, 4)) +
        parseInt(patientInfo.dateOfBirth.substr(5, 2)) +
        parseInt(patientInfo.dateOfBirth.substr(8, 2))
      : Math.round(Math.random() * 100) + 1930;
    console.log("PARSED DATE IS", parseAndAdd);
    return parseAndAdd - 1930;
  };

  const keanuSize = convertBirthDateToKeanuSize();
  console.log("KEANU SIZE IS", keanuSize);

  const keanuSrc = `https://placekeanu.com/${keanuSize}/${keanuSize}/`;

  const entries = patientInfo.entries.map((e, i) => (
    <EntryComponent key={i} entry={e} />
  ));

  const getGender = () => {
    if (patientInfo.gender === "male") {
      return "man";
    } else if (patientInfo.gender === "female") {
      return "woman";
    } else if (patientInfo.gender === "other") {
      return "genderless";
    } else {
      return "question";
    }
  };

  return (
    <Container>
      <Segment>
        <Header as="h2">
          {patientInfo.name} <Icon name={getGender()} />
        </Header>
        <Image size="small" rounded src={keanuSrc} />
        <List bulleted>
          <List.Item>Occupation: {patientInfo.occupation}</List.Item>
          <List.Item>SSN: {patientInfo.ssn}</List.Item>
          <List.Item>Born: {patientInfo.dateOfBirth}</List.Item>
        </List>
      </Segment>

      {entries}
    </Container>
  );
};

export default PatientInfo;
