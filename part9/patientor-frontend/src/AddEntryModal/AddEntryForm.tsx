import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";

import { Entry, EntryType } from "../types";
import {
  HealthCheckForm,
  HospitalEntryForm,
  OccupationalHealthcareForm,
} from "./TypeForms";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState(EntryType.HealthCheck);

  const handleTypeChange = (typeClicked: EntryType): void => {
    if (type !== typeClicked) {
      setType(typeClicked);
    }
  };

  const handleButtonColor = (typeOfButton: EntryType): "green" | "grey" => {
    if (typeOfButton === type) {
      return "green";
    } else {
      return "grey";
    }
  };

  return (
    <>
      <Segment>
        <Button
          color={handleButtonColor(EntryType.HealthCheck)}
          onClick={() => handleTypeChange(EntryType.HealthCheck)}
        >
          Health Check
        </Button>
        <Button
          color={handleButtonColor(EntryType.Hospital)}
          onClick={() => handleTypeChange(EntryType.Hospital)}
        >
          Hospital Entry
        </Button>
        <Button
          color={handleButtonColor(EntryType.OccupationalHealthcare)}
          onClick={() => handleTypeChange(EntryType.OccupationalHealthcare)}
        >
          Occupational Healthcare
        </Button>
      </Segment>
      {type === EntryType.HealthCheck && (
        <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {type === EntryType.Hospital && (
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {type === EntryType.OccupationalHealthcare && (
        <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </>
  );
};

export default AddEntryForm;
