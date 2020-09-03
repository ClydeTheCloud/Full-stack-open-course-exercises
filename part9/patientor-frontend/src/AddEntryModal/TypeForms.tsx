import React from "react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  NumberField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import {
  EntryType,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import validateDate from "../utils/dateValidator";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type OccupationalHealthcareEntryFormValues = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

interface HealthCheckFormProps {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}
interface HospitalEntryFormProps {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}
interface OccupationalHealthcareEntryFormProps {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

export const HealthCheckForm: React.FC<HealthCheckFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ loadedDiagnosisInfo: diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!validateDate(values.date)) {
          errors.date =
            "Invalid date. Please provide valid date within YYYY-MM-DD format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating === undefined) {
          errors.healthCheckRating = requiredError;
        } else if (
          values.healthCheckRating < 0 ||
          values.healthCheckRating > 3
        ) {
          errors.healthCheckRating = "Field out of range";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              diagnoses={diagnoses}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              component={DiagnosisSelection}
            />

            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export const HospitalEntryForm: React.FC<HospitalEntryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ loadedDiagnosisInfo: diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: EntryType.Hospital,
        discharge: { date: "", criteria: "" },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!validateDate(values.date)) {
          errors.date =
            "Invalid date. Please provide valid date within YYYY-MM-DD format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date && typeof errors.discharge !== "string") {
          errors.discharge = { ...errors.discharge, date: requiredError };
        } else if (
          !validateDate(values.discharge.date) &&
          typeof errors.discharge !== "string"
        ) {
          errors.discharge = {
            ...errors.discharge,
            date:
              "Invalid date. Please provide valid date within YYYY-MM-DD format",
          };
        }
        if (
          !values.discharge.criteria &&
          typeof errors.discharge !== "string"
        ) {
          errors.discharge = { ...errors.discharge, criteria: requiredError };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              diagnoses={diagnoses}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              component={DiagnosisSelection}
            />

            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export const OccupationalHealthcareForm: React.FC<OccupationalHealthcareEntryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ loadedDiagnosisInfo: diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: EntryType.OccupationalHealthcare,
        employerName: "",
        sickLeave: { endDate: "", startDate: "" },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const sickLeaveError =
          "Both 'Sick Leave' fields should be either filled out or empty";
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!validateDate(values.date)) {
          errors.date =
            "Invalid date. Please provide valid date within YYYY-MM-DD format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave && typeof errors.sickLeave !== "string") {
          if (!values.sickLeave.startDate && values.sickLeave.endDate) {
            errors.sickLeave = {
              ...errors.sickLeave,
              startDate: sickLeaveError,
            };
          }
          if (!values.sickLeave.endDate && values.sickLeave.startDate) {
            errors.sickLeave = { ...errors.sickLeave, endDate: sickLeaveError };
          }

          if (values.sickLeave.startDate && values.sickLeave.endDate) {
            if (!validateDate(values.sickLeave.startDate)) {
              errors.sickLeave = {
                ...errors.sickLeave,
                startDate:
                  "Invalid date. Please provide valid date within YYYY-MM-DD format",
              };
            }
            if (!validateDate(values.sickLeave.endDate)) {
              errors.sickLeave = {
                ...errors.sickLeave,
                endDate:
                  "Invalid date. Please provide valid date within YYYY-MM-DD format",
              };
            }
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              diagnoses={diagnoses}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              component={DiagnosisSelection}
            />

            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
