import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLES } from './gql';
import { useNavigate } from 'react-router-dom';
import DataTable from '../SharedComponents/DataTable/DataTable';

function ListBattlesPage() {
  const { loading, data } = useQuery(GET_BATTLES);
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate(`/battle/${rowData.id}`);
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
  };

  if (loading) return 'Loading...';
  return (
    <>
      <DataTable tableProps={tableProps} />
    </>
  );
}

export default ListBattlesPage;
