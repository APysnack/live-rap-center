import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEAGUES } from './gql';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';

function ListLeaguesPage() {
  const [searchText, setSearchText] = useState('');

  const { data } = useQuery(GET_LEAGUES, {
    variables: { searchText: searchText },
  });

  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate(`/league/${rowData.id}`);
  };

  const updateSearchText = (value) => {
    setSearchText(value);
  };

  const tableProps = {
    columns: [
      { title: 'rank', accessor: '', behavior: 'enumerate' },
      { title: 'image', accessor: 'leagueLogo', behavior: 'image' },
      { title: 'name', accessor: 'leagueName' },
      { title: 'rating', accessor: 'leagueScore' },
    ],
    rowData: data?.leagues ? data.leagues : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  return (
    <>
      <DataTable tableProps={tableProps} />
    </>
  );
}

export default ListLeaguesPage;
