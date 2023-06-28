import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BATTLERS } from './gql';
import StyledSelect from '../../../SharedComponents/StyledSelect/StyledSelect';
import Loading from '../../../SharedComponents/Loading/Loading';

function BattlerSearchBox({
  componentNumber,
  selectedBattlers,
  setSelectedBattlers,
}) {
  const [options, setOptions] = useState([]);

  const { loading, data } = useQuery(GET_ALL_BATTLERS);

  const handleSelect = (selection) => {
    const tempObj = { [componentNumber]: selection.value };
    setSelectedBattlers({ ...selectedBattlers, ...tempObj });
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

  if (loading) return <Loading />;

  return (
    <StyledSelect
      className='select-component'
      options={options}
      onChange={(input) => handleSelect(input)}
    />
  );
}

export default BattlerSearchBox;
