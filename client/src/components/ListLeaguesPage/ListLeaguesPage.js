import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEAGUES } from './gql';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { CLIENT_MEMORY_LIMIT } from '../SharedComponents/DataTable/Constants';

function ListLeaguesPage() {
  const [virtualFrame, setVirtualFrame] = useState(null);
  const [searchText, setSearchText] = useState('');

  const { data, loading } = useQuery(GET_LEAGUES, {
    variables: {
      searchText: searchText,
      rowsToFetch: CLIENT_MEMORY_LIMIT,
      firstPageToFetch: virtualFrame,
    },
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
      { title: 'name', accessor: 'leagueName', starRatingUnderneath: true },
      { title: 'rating', accessor: 'leagueScore' },
    ],
    rowData: data?.leagues?.leagues ? data.leagues.leagues : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  if (loading) return 'Loading...';

  return (
    <>
      <DataTable
        tableProps={tableProps}
        setVirtualFrame={setVirtualFrame}
        totalDataCount={data?.leagues?.tableRowCount}
      />
    </>
  );
}

export default ListLeaguesPage;
