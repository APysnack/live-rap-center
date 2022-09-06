import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEAGUES } from './gql';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';

function ListLeaguesPage() {
  const { loading, data } = useQuery(GET_LEAGUES);
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate(`/league/${rowData.id}`);
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
  };

  if (loading) return 'Loading...';
  return <>{data ? <DataTable tableProps={tableProps} /> : null}</>;
}

export default ListLeaguesPage;
