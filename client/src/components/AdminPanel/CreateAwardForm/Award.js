import React from 'react';
const { REACT_APP_SERVER_URL } = process.env;

function Award({ award }) {
  return (
    <div>
      <div>{award.name}</div>
      <img src={REACT_APP_SERVER_URL + award.imageUrl} width='30' height='30' />
    </div>
  );
}

export default Award;
