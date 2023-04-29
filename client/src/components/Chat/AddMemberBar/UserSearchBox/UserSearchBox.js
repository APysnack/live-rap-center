import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../gql';
import Select from 'react-select';

function UserSearchBox({ onSelect }) {
  const [options, setOptions] = useState([]);

  const { loading, data } = useQuery(GET_ALL_USERS);

  const handleSelect = (selection) => {
    onSelect(selection);
  };

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
    <Select
      className='select-component'
      options={options}
      onChange={(input) => handleSelect(input)}
    />
  );
}

export default UserSearchBox;
