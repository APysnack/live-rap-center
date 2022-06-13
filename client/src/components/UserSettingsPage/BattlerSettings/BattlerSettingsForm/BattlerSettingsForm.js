import React, { useEffect, useState } from "react";
import BaseForm from "../../../SharedComponents/BaseForm";
import { bookingPriceField } from "./BattlerSettingsFormFields";
import { useMutation } from "@apollo/client";
import { UPDATE_BATTLER } from "./gql";

function BattlerSettingsForm({ user }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [updateBattler, { data, loading, error }] = useMutation(UPDATE_BATTLER);
  const [flashMessage, setFlashMessage] = useState("");

  const callUpdateBattler = (values) => {
    // ensures the booking price is a valid number
    let bookingPrice = parseInt(values.bookingPrice.replace(/\D/g, ""));
    if (!isNaN(bookingPrice)) {
      bookingPrice = Math.floor(bookingPrice);
      updateBattler({
        variables: { userId: user.id, bookingPrice: bookingPrice },
      });
    }
  };

  useEffect(() => {
    console.log(data);
    if (data?.updateBattler?.name) {
      setFlashMessage(
        `Settings for ${data.updateBattler.name} changed successfully!`
      );
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[bookingPriceField.id] = bookingPriceField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, bookingPriceField]);
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
        onSubmit={callUpdateBattler}
        title={"Edit Battler Settings"}
      />
    </div>
  );
}

export default BattlerSettingsForm;
