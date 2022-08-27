import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BATTLES } from './gql';
import BattleLink from '../SharedComponents/BattleLink/BattleLink';

function ListBattlesPage() {
  const { loading, data } = useQuery(GET_BATTLES);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return 'Loading...';
  return (
    <>
      {data.battles.map((battle, i) => (
        <BattleLink key={i} battle={battle} />
      ))}
    </>
  );
}

export default ListBattlesPage;
