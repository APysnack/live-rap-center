import React, { useState, useEffect } from 'react';
import Award from '../Award/Award';

function ListAwards({ awards, refetch }) {
  const [filteredAwards, setFilteredAwards] = useState({});

  useEffect(() => {
    if (awards) {
      console.log(awards);
      const result = awards.reduce((acc, obj) => {
        if (acc[obj.awardType]) {
          acc[obj.awardType].push(obj);
        } else {
          acc[obj.awardType] = [obj];
        }
        return acc;
      }, {});
      console.log(result);
      setFilteredAwards(result);
    }
  }, [awards]);

  return (
    <div>
      <div>
        <div>
          <div>Uncategorized</div>
          {filteredAwards['']?.map((award) => (
            <Award key={award.id} award={award} refetch={refetch} />
          ))}
        </div>
        <div>League Awards</div>
        {filteredAwards['league_award']?.map((award) => (
          <Award key={award.id} award={award} refetch={refetch} />
        ))}
      </div>
      <div>
        <div>Battler Awards</div>
        {filteredAwards['battler_award']?.map((award) => (
          <Award key={award.id} award={award} refetch={refetch} />
        ))}
      </div>
      <div>
        <div>Voter Awards</div>
        {filteredAwards['voter_award']?.map((award) => (
          <Award key={award.id} award={award} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}

export default ListAwards;
