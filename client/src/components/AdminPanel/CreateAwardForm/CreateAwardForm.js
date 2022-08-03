import React from 'react';
import ImageUploadModal from '../../SharedComponents/ImageUploadModal/ImageUploadModal';
import { GET_AWARDS } from './gql';
import { useQuery } from '@apollo/client';
import Award from './Award';

function CreateAwardForm() {
  const { loading, data, refetch } = useQuery(GET_AWARDS);

  if (loading) return 'Loading...';
  return (
    <div>
      <div>All Awards</div>
      {data?.awards?.length > 0
        ? data.awards.map((award) => <Award award={award} />)
        : null}
      <ImageUploadModal type='award image' refetch={refetch} />
    </div>
  );
}

export default CreateAwardForm;
