import React from 'react';
import ImageUploadModal from '../../SharedComponents/ImageUploadModal/ImageUploadModal';
import { GET_AWARDS } from './gql';
import { useQuery } from '@apollo/client';
import ListAwards from './ListAwards/ListAwards';

function CreateAwardForm() {
  const { loading, data, refetch } = useQuery(GET_AWARDS);

  if (loading) return 'Loading...';

  return (
    <div>
      <ListAwards awards={data?.awards} refetch={refetch} />
      <ImageUploadModal type='award image' refetch={refetch} />
    </div>
  );
}

export default CreateAwardForm;
