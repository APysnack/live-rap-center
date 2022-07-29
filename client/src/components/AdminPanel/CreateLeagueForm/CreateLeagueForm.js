import React, { useEffect, useState } from "react";
import BaseForm from "../../SharedComponents/BaseForm";
import { leagueNameField, leagueUrlField } from "./CreateLeagueFormFields";
import { useMutation } from "@apollo/client";
import { CREATE_LEAGUE } from "./gql";

function CreateLeagueForm() {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [createLeague, { data, loading, error }] = useMutation(CREATE_LEAGUE);
  const [flashMessage, setFlashMessage] = useState("");

  const addNewLeague = (values) => {
    createLeague({
      variables: { leagueName: values.leagueName, leagueUrl: values.leagueUrl },
    });
  };

  useEffect(() => {
    if (data?.createLeague?.leagueName) {
      setFlashMessage(`${data.createLeague.leagueName} added successfully!`);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[leagueNameField.id] = leagueNameField.initialValue;
      newValues[leagueUrlField.id] = leagueUrlField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, leagueNameField]);
      setFieldArray((fieldArray) => [...fieldArray, leagueUrlField]);
    }
  }, []);

  if (loading) return "Loading...";
  if (error) return `Submission error ${error.message}`;

  return (
    <div>
      {flashMessage ? <div>{flashMessage} added successfully</div> : null}
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={addNewLeague}
        title={"Add New League"}
      />
    </div>
  );
}

export default CreateLeagueForm;
