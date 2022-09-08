import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLES } from './gql';
import { useNavigate } from 'react-router-dom';
import DataTable from '../SharedComponents/DataTable/DataTable';

function ListBattlesPage() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const { data } = useQuery(GET_BATTLES, {
    variables: { searchText: searchText },
  });

  const handleRowClick = (rowData) => {
    navigate(`/battle/${rowData.id}`);
  };

  const updateSearchText = (value) => {
    setSearchText(value);
  };

  const tableProps = {
    columns: [
      { title: 'rank', accessor: '', behavior: 'enumerate' },
      { title: 'image', accessor: 'battleImage', behavior: 'image' },
      { title: 'title', accessor: 'battlers', behavior: 'versus' },
      { title: 'league name', accessor: 'leagueName' },
      { title: 'rating', accessor: 'score' },
    ],
    rowData: data?.battles ? data.battles : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  return (
    <>
      <DataTable tableProps={tableProps} />
    </>
  );
}

export default ListBattlesPage;
