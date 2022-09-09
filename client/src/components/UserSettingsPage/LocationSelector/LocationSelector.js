import React, { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UPDATE_USER_LOCATION } from './gql';
import { useMutation } from '@apollo/client';

function LocationSelector({ user, refetchUser }) {
  const [country, setCountry] = useState('United States');
  const [region, setRegion] = useState('');

  const [updateUserLocation] = useMutation(UPDATE_USER_LOCATION);

  useEffect(() => {
    if (
      user?.location?.country &&
      user?.location?.region &&
      user?.location?.country !== '' &&
      user?.location?.region !== ''
    ) {
      setCountry(user.location.country);
      setRegion(user.location.region);
    }
  }, [user]);

  const handleUpdate = () => {
    updateUserLocation({
      variables: {
        userId: user.id,
        country: country,
        region: region,
      },
      onCompleted: refetchUser,
    });
  };

  useEffect(() => {
    if (region !== '') {
      handleUpdate();
    }
  }, [region]);

  return (
    <div>
      <CountryDropdown
        value={country}
        onChange={(value) => setCountry(value)}
      />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(value) => setRegion(value)}
      />
    </div>
  );
}

export default LocationSelector;
