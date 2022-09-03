import React, { useEffect, useState } from 'react';
import spacesApi from '../../api/spacesApi';
import { formatDate } from '../../utils/helperFunctions';

function ListSpacesPage() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    spacesApi.getSpaces(updateSpaces);
  }, []);

  const updateSpaces = (spaces) => {
    setSpaces(spaces.data);
  };

  return (
    <div>
      {spaces?.length > 0 ? (
        spaces.map((space) => (
          <div key={space.id}>
            <a href={`https://twitter.com/i/spaces/${space.id}`}>
              <div>{space.title}</div>
              <div>{`Started at ${formatDate(space.started_at, [
                'includeWeekday',
                'includeHour',
                'includeMinute',
              ])}`}</div>
              <div>{space.participant_count} participants</div>
              <div>{space.state}</div>
            </a>
          </div>
        ))
      ) : (
        <div>No spaces are currently active or scheduled</div>
      )}
    </div>
  );
}

export default ListSpacesPage;
