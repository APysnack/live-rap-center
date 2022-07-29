import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Checkbox from "@mui/material/Checkbox";

function StarSelector({
  battler,
  updateStarState,
  updateCheckState,
  checkDisabled,
}) {
  const battlerId = battler.id;
  return (
    <div>
      <div>{battler.name}</div>
      <StarRatingComponent
        name={battler.id}
        id="test"
        onStarClick={(value) => updateStarState(battlerId, value)}
      />
      <div>
        <div>Winner of the Battle</div>
        <Checkbox
          disabled={checkDisabled}
          onChange={(e) => updateCheckState(battlerId, e.target.checked)}
        />
      </div>
    </div>
  );
}

export default StarSelector;
