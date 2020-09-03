import React from "react";
import PatientInfo from "./PatientInfo";
import AddEntryModal from "../AddEntryModal";
import { Button, Divider } from "semantic-ui-react";
import axios from "axios";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { useStateValue, addNewEntry } from "../state";

interface PatientPageParams {
  id: string;
}

const PatientPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [, dispatch] = useStateValue();

  const params = useParams<PatientPageParams>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${params.id}/entries`,
        values
      );
      dispatch(addNewEntry({ patientId: params.id, entry: newEntry }));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <>
      <PatientInfo patientId={params.id} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Divider hidden />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default PatientPage;
