import React from "react";
import { VoteDetailsContainer } from "./VoteDetails.styles";

function VoteDetails({ vote }) {
  return (
    <VoteDetailsContainer>
      <div className="header">
        <div>vote from {vote.voterName} </div>
        <div>comment: {vote.comment}</div>
      </div>
      {vote?.scores?.length > 0
        ? vote.scores.map((score) => (
            <div key={score.id}>
              {score.battlerName} {score.outcome} {score.value}
            </div>
          ))
        : null}
    </VoteDetailsContainer>
  );
}

export default VoteDetails;
