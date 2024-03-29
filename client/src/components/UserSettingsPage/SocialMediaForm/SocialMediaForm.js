import React, { useEffect, useState, useRef } from 'react';
import BaseForm from '../../SharedComponents/BaseForm';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SOCIAL_PLATFORMS, UPDATE_SOCIALS } from './gql';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';
import Loading from '../../SharedComponents/Loading/Loading';

function SocialMediaForm({ currentUser, refetchUser }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);
  const [userSocials, setUserSocials] = useState({});
  const userIsMounted = useRef(false);

  const { loading: platformQueryLoading, data: platformQuery } = useQuery(
    GET_ALL_SOCIAL_PLATFORMS
  );
  const [updateSocials, { loading, data, error }] = useMutation(UPDATE_SOCIALS);

  useEffect(() => {
    if (currentUser?.socialMediaLinks) {
      let socials = {};
      currentUser.socialMediaLinks.map((social) => {
        let newObj = { [social.socialMediaPlatformName]: social.url };
        socials = { ...socials, ...newObj };
      });
      setUserSocials({ ...socials });
      userIsMounted.current = true;
    }
  }, [currentUser]);

  // generates SocialMediaFormFields dynamically
  // one for each SocialMediaPlatform in the database
  useEffect(() => {
    if (
      platformQuery?.socialMediaPlatforms?.length > 0 &&
      !Object.keys(initialValues).length > 0 &&
      !fieldArray.length > 0 &&
      userIsMounted.current === true
    ) {
      let newValues = {};

      platformQuery.socialMediaPlatforms.forEach((platform) => {
        // if user already has a url for this platform, autopopulates
        // field with the url
        let initialValue = userSocials[platform.name]
          ? userSocials[platform.name]
          : '';

        let newField = {
          id: platform.id,
          initialValue: initialValue,
          name: platform.id,
          placeholder: 'Please enter your ' + platform.name + ' link',
          type: 'text',
          displayedLabel: platform.name + ' Link',
        };

        newValues[newField.id] = newField.initialValue;
        setFieldArray((fieldArray) => [...fieldArray, newField]);
      });
      setInitialValues({ ...initialValues, ...newValues });
    }
  }, [userSocials, platformQuery, initialValues, fieldArray]);

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
        userId: currentUser.id,
        attributes: attributesArray,
      },
      onCompleted: resetForm,
    });
  };

  const resetForm = () => {
    userIsMounted.current = false;
    setUserSocials({});
    setInitialValues({});
    refetchUser();
  };

  useEffect(() => {
    if (data) {
      let newValues = {};
      data.updateSocialMediaLinks?.map((link) => {
        newValues[link.socialMediaPlatformId] = link.url;
      });
      setInitialValues({ ...newValues });
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  if (loading || platformQueryLoading) return <Loading />;
  if (error) return `Submission error ${error.message}`;

  const socialMediaLinksContent = () => {
    return (
      <div className='form-width-control'>
        <BaseForm
          initialValues={initialValues}
          fieldArray={fieldArray}
          onSubmit={updateSocialLinks}
          title={''}
        />
      </div>
    );
  };

  const settingsProps = {
    header: 'Social Media',
    components: [{ title: '', component: socialMediaLinksContent }],
  };

  return (
    <SettingsGroup
      width={25}
      height={66}
      settingsProps={settingsProps}
    ></SettingsGroup>
  );
}

export default SocialMediaForm;
