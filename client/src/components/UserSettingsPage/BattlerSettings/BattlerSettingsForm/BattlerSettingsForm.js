import React, { useEffect, useState } from 'react';
import BaseForm from '../../../SharedComponents/BaseForm';
import { bookingPriceField } from './BattlerSettingsFormFields';
import { useMutation } from '@apollo/client';
import { UPDATE_BATTLER } from './gql';
import Loading from '../../../SharedComponents/Loading/Loading';

function BattlerSettingsForm({ user, battler }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [updateBattler, { data, loading, error }] = useMutation(UPDATE_BATTLER);
  const [flashMessage, setFlashMessage] = useState('');

  // submits form data and changes the battler based on the user's submitted values
  const callUpdateBattler = (values) => {
    // ensures field is meant to be update & that booking price is a valid number
    if (values?.bookingPriceCheckbox) {
      let bookingPrice = parseInt(values.bookingPrice.replace(/\D/g, ''));
      if (!isNaN(bookingPrice)) {
        bookingPrice = Math.floor(bookingPrice);
        updateBattler({
          variables: {
            userId: user.id,
            bookingPrice: bookingPrice,
            bookingPriceEnabled: true,
          },
        });
      }
    } else {
      updateBattler({
        variables: { userId: user.id, bookingPriceEnabled: false },
      });
    }
  };

  // currently just refreshes the page for simplicity,
  // in the future, notify the user their form submission updated the battler successfully
  // then update the current view with any changes to the booking price/booking price enabled
  // details from the database after the form submission
  useEffect(() => {
    if (data?.updateBattler?.name) {
      window.location.reload();
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  // initializes values for dynamically generating and populating the form
  useEffect(() => {
    if (
      battler &&
      !Object.keys(initialValues).length > 0 &&
      !fieldArray.length > 0
    ) {
      bookingPriceField.isCheckboxField.initialState =
        battler.bookingPriceEnabled;

      let newValues = {};
      // sets keys for newValues
      newValues[bookingPriceField.id] = battler
        ? battler.bookingPrice.toString()
        : bookingPriceField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, bookingPriceField]);
    }
  }, [battler]);

  if (loading) return <Loading />;
  if (error) return `Submission error ${error.message}`;

  return (
    <div>
      {flashMessage ? <div>{flashMessage}</div> : null}
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={callUpdateBattler}
        title={''}
      />
    </div>
  );
}

export default BattlerSettingsForm;
