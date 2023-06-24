import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLERS } from './gql';
import { BattlerListContainer } from './ListBattlers.styles';
import DataTable from '../SharedComponents/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { CLIENT_MEMORY_LIMIT } from '../SharedComponents/DataTable/Constants';
import useViewType from '../../utils/useViewType';

function ListBattlersPage() {
  const [searchText, setSearchText] = useState('');
  const [virtualFrame, setVirtualFrame] = useState(null);
  const viewType = useViewType();
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

  const generateColumnsFromViewType = () => {
    const columns = [];

    columns.push({
      title: 'rank',
      accessor: '',
      behavior: 'enumerate',
      width: viewType === 'desktop' ? '5em' : '4em',
    });

    if (viewType === 'desktop') {
      columns.push({
        title: 'image',
        accessor: 'battlerImage',
        behavior: 'image',
        width: '5em',
      });
    }

    columns.push({
      title: 'name',
      accessor: 'name',
      starRatingUnderneath: true,
      width: '9em',
    });

    if (viewType === 'desktop') {
      columns.push(
        { title: 'location', accessor: 'region', width: '8em' },
        { title: 'league', accessor: 'leagueName', width: '12em' },
        { title: 'rating', accessor: 'score', width: '5em' }
      );
    }

    return columns;
  };

  const tableProps = {
    columns: generateColumnsFromViewType(),
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
