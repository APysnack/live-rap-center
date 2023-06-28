import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEAGUES } from './gql';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { CLIENT_MEMORY_LIMIT } from '../SharedComponents/DataTable/Constants';
import useViewType from '../../utils/useViewType';

function ListLeaguesPage() {
  const viewType = useViewType();
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

  const generateColumnsFromViewType = () => {
    const columns = [];

    columns.push({
      title: 'rank',
      accessor: '',
      behavior: 'enumerate',
      ...(viewType !== 'desktop' && { width: '4em' }),
    });

    if (viewType === 'desktop') {
      columns.push({
        title: 'image',
        accessor: 'leagueLogo',
        behavior: 'image',
      });
    }

    columns.push({
      title: 'name',
      accessor: 'leagueName',
      starRatingUnderneath: true,
    });

    if (viewType === 'desktop') {
      columns.push({ title: 'rating', accessor: 'leagueScore' });
    }

    return columns;
  };

  const tableProps = {
    columns: generateColumnsFromViewType(),
    rowData: data?.leagues?.leagues ? data.leagues.leagues : [],
    onRowClick: handleRowClick,
    onSearch: updateSearchText,
  };

  return (
    <>
      <DataTable
        tableProps={tableProps}
        setVirtualFrame={setVirtualFrame}
        totalDataCount={data?.leagues?.tableRowCount}
        loading={loading}
      />
    </>
  );
}

export default ListLeaguesPage;
