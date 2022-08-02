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
      <div>Lyricism</div>
      <StarRatingComponent
        name={"lyricism-" + battler.id}
        id="lyricism"
        onStarClick={(value) => updateStarState(battlerId, value, "lyricism")}
      />
      <div>Performance</div>
      <StarRatingComponent
        name={"performance-" + battler.id}
        id="performance"
        onStarClick={(value) =>
          updateStarState(battlerId, value, "performance")
        }
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
