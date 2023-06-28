import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLES } from './gql';
import { useNavigate } from 'react-router-dom';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { CLIENT_MEMORY_LIMIT } from '../SharedComponents/DataTable/Constants';
import useViewType from '../../utils/useViewType';

function ListBattlesPage() {
  const [virtualFrame, setVirtualFrame] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const viewType = useViewType();

  const { data, loading } = useQuery(GET_BATTLES, {
    variables: {
      searchText: searchText,
      rowsToFetch: CLIENT_MEMORY_LIMIT,
      firstPageToFetch: virtualFrame,
    },
  });

  const generateColumnsFromViewType = () => {
    const columns = [];

    columns.push({
      title: 'rank',
      accessor: '',
      behavior: 'enumerate',
      width: '5em',
    });

    if (viewType === 'desktop') {
      columns.push({
        title: 'image',
        accessor: 'battleImage',
        behavior: 'image',
        width: '20em',
      });
    }

    columns.push({
      title: 'title',
      accessor: 'battlers',
      behavior: 'versus',
      starRatingUnderneath: true,
      width: '20em',
    });

    if (viewType === 'desktop') {
      columns.push(
        { title: 'league', accessor: 'leagueName', width: '12em' },
        { title: 'rating', accessor: 'score', width: '5em' }
      );
    }

    return columns;
  };

  const handleRowClick = (rowData) => {
    navigate(`/battle/${rowData.id}`);
  };

  const updateSearchText = (value) => {
    setSearchText(value);
  };

  const tableProps = {
    columns: generateColumnsFromViewType(),
    rowData: data?.battles?.battles ? data.battles.battles : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  return (
    <>
      <DataTable
        tableProps={tableProps}
        setVirtualFrame={setVirtualFrame}
        totalDataCount={data?.battles?.tableRowCount}
        loading={loading}
      />
    </>
  );
}

export default ListBattlesPage;
