import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_BATTLERS } from './gql';
import Select from 'react-select';

function BattlerSearchBox({
  componentNumber,
  selectedBattlers,
  setSelectedBattlers,
}) {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  const { loading, data, refetch, error } = useQuery(SEARCH_BATTLERS, {
    variables: { searchString: searchText },
  });

  const handleSelect = (selection) => {
    const tempObj = { [componentNumber]: selection.value };
    setSelectedBattlers({ ...selectedBattlers, ...tempObj });
  };

  useEffect(() => {
    if (data?.battlerSearch) {
      let battlersArray = [];
      data.battlerSearch.map((battler) => {
        let tempObj = { label: battler.name, value: battler.id };
        battlersArray.push(tempObj);
      });
      setOptions(battlersArray);
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

export default BattlerSearchBox;
