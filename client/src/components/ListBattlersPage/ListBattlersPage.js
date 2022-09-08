import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLERS } from './gql';
import { BattlerListContainer, BattlerLink } from './ListBattlers.styles';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';

function ListBattlersPage() {
  const [searchText, setSearchText] = useState('');
  const { loading, data } = useQuery(GET_BATTLERS, {
    variables: { searchText: searchText },
  });

  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate(`/battler/${rowData.id}`);
  };

  const updateSearchText = (value) => {
    setSearchText(value);
  };

  const tableProps = {
    columns: [
      { title: 'rank', accessor: '', behavior: 'enumerate' },
      { title: 'image', accessor: 'battlerImage', behavior: 'image' },
      { title: 'name', accessor: 'name' },
      { title: 'location', accessor: 'region' },
      { title: 'rating', accessor: 'score' },
    ],
    rowData: data?.battlers ? data.battlers : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  return (
    <BattlerListContainer>
      <DataTable tableProps={tableProps} />
    </BattlerListContainer>
  );
}

export default ListBattlersPage;
