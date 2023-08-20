import React, { useState, useEffect } from 'react';
import { InitializeUserWrapper } from './InitializeUserForm.styles';
import StyledSelect from '../../SharedComponents/StyledSelect/StyledSelect';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_BATTLERS, INITIALIZE_USER } from '../gql';
import Loading from '../../SharedComponents/Loading/Loading';

function InitializeUserForm({ currentUser, setShowForm }) {
  const [options, setOptions] = useState([]);
  const [selectedBattler, setSelectedBattler] = useState(null);
  const [initializeUser] = useMutation(INITIALIZE_USER);

  const { loading, data } = useQuery(GET_ALL_BATTLERS, {
    variables: {
      fetchAll: true,
    },
  });

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

  const assignBattlerToUser = () => {
    initializeUser({
      variables: {
        userId: currentUser.id,
        battlerId: selectedBattler.value,
      },
      onCompleted: showDashboard,
    });
  };

  const initializeWithoutBattler = () => {
    initializeUser({
      variables: {
        userId: currentUser.id,
      },
      onCompleted: showDashboard,
    });
  };

  const showDashboard = () => {
    setShowForm(false);
  };

  if (loading) return <Loading />;

  return (
    <InitializeUserWrapper>
      <div className='form-header'>What name do you battler under?</div>
      <StyledSelect
        options={options}
        onChange={(selectedBattler) => setSelectedBattler(selectedBattler)}
      />
      <div
        className='lrc-button not-a-battler-btn'
        onClick={assignBattlerToUser}
      >
        This is the name I battle under
      </div>
      <div
        className='lrc-button not-a-battler-btn'
        onClick={initializeWithoutBattler}
      >
        I don't see my battler name or I am not a battler
      </div>
    </InitializeUserWrapper>
  );
}

export default InitializeUserForm;
