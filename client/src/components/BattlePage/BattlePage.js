import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BATTLE } from './gql';
import { useQuery } from '@apollo/client';
import api from '../../api/api';
import { useSelector } from 'react-redux';
import VoteSubmissionPanel from './VoteSubmissionPanel/VoteSubmissionPanel';
import { BattlePageContainer, VotesContainer } from './BattlePage.styles';
import VoteDetails from './VoteDetails/VoteDetails';
import _ from 'lodash';
import BattleContainer from './BattleContainer';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';

function BattlePage() {
  const { user } = useSelector((state) => state.user.userState);
  const { battleId } = useParams();
  const [battle, setBattle] = useState({});
  const [youtubeStats, setYoutubeStats] = useState({});
  const [youtubeId, setYoutubeId] = useState('');
  const [userHasVoted, setUserHasVoted] = useState(false);
  const [userViewingPageIsInBattle, setUserViewingPageIsInBattle] =
    useState(false);

  const updateBattle = (data) => {
    setBattle(data.battle);
    setYoutubeId(data.battle.battleUrl);
    if (data?.battle?.battleVotes.length > 0) {
      checkIfUserHasVoted(data.battle.battleVotes);
    }
  };

  const checkIfUserHasVoted = (votes) => {
    setUserHasVoted(_.map(votes, 'voterId').includes('' + user.voter_id));
  };

  useEffect(() => {
    if (user && Object.keys(battle).length > 0) {
      checkIfUserIsInBattle(battle);
    }
  }, [user, battle]);

  const checkIfUserIsInBattle = (battle) => {
    battle.battlers.map((battler) => {
      if (battler.id === '' + user.battler_id) {
        setUserViewingPageIsInBattle(true);
      }
    });
  };

  const { loading, refetch } = useQuery(GET_BATTLE, {
    variables: { id: battleId },
    onCompleted: updateBattle,
  });

  // fetches video from youtube API
  useEffect(() => {
    if (youtubeId) {
      api.fetchYouTubeVideos(youtubeId, setYoutubeStats);
    }
  }, [youtubeId]);

  if (loading) return 'Loading...';

  return (
    <BattlePageContainer>
      {youtubeStats?.snippet ? (
        <div>
          <BattleContainer
            className='battle-container'
            stats={youtubeStats}
            youtubeId={youtubeId}
            battle={battle}
          />

          {battle.battleStatus === 'open' &&
          user?.voter_id !== null &&
          !userViewingPageIsInBattle ? (
            !userHasVoted ? (
              <VoteSubmissionPanel
                user={user}
                battle={battle}
                refetchBattle={refetch}
              />
            ) : (
              'You have already voted on this battle'
            )
          ) : (
            ''
          )}

          {battle?.battlers
            ? Object.keys(battle.battlers).map((battler, i) =>
                battle.battlers[battler]?.user?.username ? (
                  <div key={i}>
                    {battle.battlers[battler].user.username} is a user
                  </div>
                ) : null
              )
            : null}
          {battle?.battleVotes.length > 0 ? (
            <ContentContainer
              width={1600}
              flexDirection='column'
              height={'100%'}
              margin='0.25em 0 2em 0'
            >
              <VotesContainer>
                <div className='header-container'>
                  <div className='title-text'>Votes</div>
                </div>

                {battle.battleVotes.map((vote) => (
                  <VoteDetails
                    key={vote.id}
                    vote={vote}
                    refetchBattle={refetch}
                  />
                ))}
              </VotesContainer>
            </ContentContainer>
          ) : null}
        </div>
      ) : (
        <div>Battle could not be found</div>
      )}
    </BattlePageContainer>
  );
}

export default BattlePage;
