import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../gql';
import StyledSelect from '../../../SharedComponents/StyledSelect/StyledSelect';

function UserSearchBox({ onSelect, className = 'select-component' }) {
  const [options, setOptions] = useState([]);
  const { loading, data } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    if (data?.users) {
      let usersArray = [];
      data.users.map((user) => {
        let tempObj = { label: user.username, value: user.id };
        usersArray.push(tempObj);
      });
      setOptions(usersArray);
    }
  }, [data]);

  if (loading) return 'Loading...';

  return (
    <StyledSelect className={className} options={options} onChange={onSelect} />
  );
}

export default UserSearchBox;
