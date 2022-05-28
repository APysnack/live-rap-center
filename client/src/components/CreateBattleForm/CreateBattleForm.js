import React, { useEffect, useState } from "react";
import BaseForm from "../SharedComponents/BaseForm";
import { leagueIdField, battleUrlField } from "./CreateBattleFormFields";
import { useMutation } from "@apollo/client";
import { CREATE_BATTLE } from "./gql";

function CreateBattleForm() {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [createBattle, { data, loading, error }] = useMutation(CREATE_BATTLE);
  const [flashMessage, setFlashMessage] = useState("");

  const addNewBattle = (values) => {
    createBattle({
      variables: { leagueId: values.leagueId, battleUrl: values.battleUrl },
    });
  };

  useEffect(() => {
    if (data?.createBattle?.battleUrl) {
      setFlashMessage(`${data.createBattle.battleUrl} added successfully!`);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[leagueIdField.id] = leagueIdField.initialValue;
      newValues[battleUrlField.id] = battleUrlField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, leagueIdField]);
      setFieldArray((fieldArray) => [...fieldArray, battleUrlField]);
    }
  }, []);

  if (loading) return "Loading...";
  if (error) return `Submission error ${error.message}`;

  return (
    <div>
      {flashMessage ? <div>{flashMessage}</div> : null}
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={addNewBattle}
        title={"Add New Battle"}
      />
    </div>
  );
}

export default CreateBattleForm;
