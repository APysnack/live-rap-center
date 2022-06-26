import React, { useState, useEffect } from "react";
import BaseForm from "../../SharedComponents/BaseForm";
import { leagueNameField } from "./EditLeagueFormFields";
import { UPDATE_LEAGUE_SETTINGS } from "./gql";
import { useMutation } from "@apollo/client";

function EditLeagueForm({ refetch, league }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);
  const [updateLeagueSettings, { data }] = useMutation(UPDATE_LEAGUE_SETTINGS);

  const updateLeague = (values) => {
    if (values?.leagueName) {
      updateLeagueSettings({
        variables: { leagueId: league.id, leagueName: values.leagueName },
        onCompleted: refetch,
      });
    }
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[leagueNameField.id] = leagueNameField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, leagueNameField]);
    }
  }, []);

  return (
    <div>
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={updateLeague}
        title={"Edit League Settings"}
      />
    </div>
  );
}

export default EditLeagueForm;
