import React, { useEffect, useState } from "react";
import BaseForm from "../../SharedComponents/BaseForm";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_SOCIAL_PLATFORMS, UPDATE_SOCIALS } from "./gql";
import { useSelector } from "react-redux";

function SocialMediaForm() {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);
  const { user } = useSelector((state) => state.user.userState);

  const { loading: platformQueryLoading, data: platformQuery } = useQuery(
    GET_ALL_SOCIAL_PLATFORMS
  );
  const [updateSocials, { loading, data, error }] = useMutation(UPDATE_SOCIALS);

  // generates SocialMediaFormFields dynamically
  // one for each SocialMediaPlatform in the database
  useEffect(() => {
    if (platformQuery?.socialMediaPlatforms?.length > 0) {
      let newValues = {};

      platformQuery.socialMediaPlatforms.forEach((platform) => {
        let usersCurrentUrl = user.socials[platform.name].url;
        let initialValue = usersCurrentUrl.length > 0 ? usersCurrentUrl : "";

        let newField = {
          id: platform.id,
          initialValue: initialValue,
          name: platform.id,
          placeholder: "Please enter your " + platform.name + " link",
          type: "text",
          displayedLabel: platform.name + " Link",
        };

        newValues[newField.id] = newField.initialValue;
        setFieldArray((fieldArray) => [...fieldArray, newField]);
      });
      setInitialValues({ ...initialValues, ...newValues });
    }
  }, [platformQuery]);

  const [flashMessage, setFlashMessage] = useState("");

  const updateSocialLinks = (values) => {
    let attributesArray = [];

    Object.keys(values).map((keyName) => {
      let newObj = {
        socialMediaPlatformId: parseInt(keyName),
        url: values[keyName],
      };
      attributesArray.push(newObj);
    });

    updateSocials({
      variables: {
        userId: user.id,
        attributes: attributesArray,
      },
    });
  };

  useEffect(() => {
    if (data) {
      let newValues = {};
      data.updateSocialMediaLinks?.map((link) => {
        newValues[link.socialMediaPlatformId] = link.url;
      });
      setInitialValues({ ...newValues });
      setFlashMessage("Settings updated successfully!");
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  if (loading || platformQueryLoading) return "Loading...";
  if (error) return `Submission error ${error.message}`;

  return (
    <div>
      {flashMessage ? <div>{flashMessage} added successfully</div> : null}
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={updateSocialLinks}
        title={""}
      />
    </div>
  );
}

export default SocialMediaForm;
