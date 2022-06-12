import React, { useEffect, useState } from "react";
import BaseForm from "../../SharedComponents/BaseForm";
import {
  facebookField,
  instagramField,
  twitterField,
  soundcloudField,
  tiktokField,
} from "./SocialMediaFormFields";
import { useMutation } from "@apollo/client";
import { CREATE_LEAGUE } from "./gql";

function SocialMediaForm() {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [createLeague, { data, loading, error }] = useMutation(CREATE_LEAGUE);
  const [flashMessage, setFlashMessage] = useState("");

  const addNewLeague = (values) => {
    createLeague({
      variables: {
        instagram: values.instagramHandle,
        twitter: values.twitterHandle,
        soundcloud: values.soundcloudHandle,
        facebook: values.facebookHandle,
        tiktok: values.tiktokHandle,
      },
    });
  };

  useEffect(() => {
    if (data?.createLeague?.facebook) {
      setFlashMessage(`${data.createLeague.facebook} added successfully!`);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[instagramField.id] = instagramField.initialValue;
      newValues[twitterField.id] = twitterField.initialValue;
      newValues[soundcloudField.id] = soundcloudField.initialValue;
      newValues[facebookField.id] = facebookField.initialValue;
      newValues[tiktokField.id] = tiktokField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, instagramField]);
      setFieldArray((fieldArray) => [...fieldArray, twitterField]);
      setFieldArray((fieldArray) => [...fieldArray, soundcloudField]);
      setFieldArray((fieldArray) => [...fieldArray, facebookField]);
      setFieldArray((fieldArray) => [...fieldArray, tiktokField]);
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
        title={""}
      />
    </div>
  );
}

export default SocialMediaForm;
