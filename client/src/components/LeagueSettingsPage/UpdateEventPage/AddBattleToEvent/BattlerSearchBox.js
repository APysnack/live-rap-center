import React, { useState, useEffect } from 'react';
import StyledSelect from '../../../SharedComponents/StyledSelect/StyledSelect';

function BattlerSearchBox({
  componentNumber,
  onSelect,
  data,
  onSearch,
  searchText,
}) {
  const [options, setOptions] = useState([]);

  const handleSelect = (selection) => {
    const tempObj = { [componentNumber]: selection.value };
    onSelect(tempObj);
  };

  useEffect(() => {
    if (data?.battlers?.battlers) {
      let battlersArray = [];
      data.battlers.battlers.map((battler) => {
        let tempObj = { label: battler.name, value: battler.id };
        battlersArray.push(tempObj);
      });
      setOptions(battlersArray);
    }
  }, [data]);

  return (
    <StyledSelect
      className='select-component'
      options={options}
      onChange={(input) => handleSelect(input)}
      onSearch={(input) => onSearch(input)}
      value={searchText}
    />
  );
}

export default BattlerSearchBox;
