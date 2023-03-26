import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLERS } from './gql';
import { BattlerListContainer } from './ListBattlers.styles';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { CLIENT_MEMORY_LIMIT } from '../SharedComponents/DataTable/Constants';

function ListBattlersPage() {
  const [searchText, setSearchText] = useState('');
  const [virtualFrame, setVirtualFrame] = useState(null);
  const { loading, data } = useQuery(GET_BATTLERS, {
    variables: {
      searchText: searchText,
      rowsToFetch: CLIENT_MEMORY_LIMIT,
      firstPageToFetch: virtualFrame,
    },
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
      { title: 'name', accessor: 'name', starRatingUnderneath: true },
      { title: 'location', accessor: 'region' },
      { title: 'rating', accessor: 'score' },
    ],
    rowData: data?.battlers?.battlers ? data.battlers.battlers : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  return (
    <BattlerListContainer>
      <DataTable
        tableProps={tableProps}
        setVirtualFrame={setVirtualFrame}
        totalDataCount={data?.battlers?.tableRowCount}
      />
    </BattlerListContainer>
  );
}

export default ListBattlersPage;
