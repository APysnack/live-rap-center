import React, { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UPDATE_USER_LOCATION } from './gql';
import { useMutation } from '@apollo/client';

function LocationSelector({ object, refetch, type }) {
  const [country, setCountry] = useState('United States');
  const [region, setRegion] = useState('');

  const [updateUserLocation] = useMutation(UPDATE_USER_LOCATION);

  useEffect(() => {
    if (
      object?.location?.country &&
      object?.location?.region &&
      object?.location?.country !== '' &&
      object?.location?.region !== ''
    ) {
      setCountry(object.location.country);
      setRegion(object.location.region);
    }
  }, [object]);

  const handleUpdate = () => {
    if (type === 'user') {
      console.log(country);
      console.log(region);
      console.log(object.id);
      updateUserLocation({
        variables: {
          userId: object.id,
          country: country,
          region: region,
        },
        onCompleted: refetch,
      });
    }
  };

  useEffect(() => {
    if (region !== '') {
      handleUpdate();
    }
  }, [region]);

  return (
    <>
      <CountryDropdown
        value={country}
        onChange={(value) => setCountry(value)}
      />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(value) => setRegion(value)}
      />
    </>
  );
}

export default LocationSelector;
