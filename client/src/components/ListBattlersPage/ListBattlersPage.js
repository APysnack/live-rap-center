import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLERS } from './gql';
import { BattlerListContainer, BattlerLink } from './ListBattlers.styles';
import DataTable from '../SharedComponents/DataTable/DataTable';

function ListBattlersPage() {
  const { loading, data } = useQuery(GET_BATTLERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const tableProps = {
    columns: [
      { title: 'rank', accessor: '', behavior: 'enumerate' },
      { title: 'image', accessor: 'image', behavior: 'image' },
      { title: 'name', accessor: 'name' },
      { title: 'location', accessor: 'location' },
      { title: 'rating', accessor: 'score' },
    ],
    rowData: data?.battlers ? data.battlers : [],
  };

  if (loading) return 'Loading...';

  return (
    <BattlerListContainer>
      <DataTable tableProps={tableProps} />
    </BattlerListContainer>
  );
}

export default ListBattlersPage;
