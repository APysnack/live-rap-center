import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BATTLER, GET_USER } from './gql';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import LeagueOwnerControls from './LeagueOwnerControls';
import SocialMediaContainer from '../SharedComponents/SocialMediaContainer/SocialMediaContainer';
import { Avatar } from '@mui/material';
import FollowBattlerButton from './FollowBattlerButton';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  BattlerPageContainer,
  LeagueOwnerPanel,
  BattlerStatContainer,
} from './BattlerPage.styles';
import BattleLink from '../SharedComponents/BattleLink/BattleLink';
import UserPageHeadline from '../SharedComponents/UserPageHeadlines/UserPageHeadline';

function BattlerPage() {
  let { battlerId } = useParams();
  const [flashMessage, setFlashMessage] = useState('');
  const [battler, setBattler] = useState(null);
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
  });
  const { user } = useSelector((state) => state.user.userState);

  const { loading, data, refetch } = useQuery(GET_BATTLER, {
    variables: { id: battlerId },
  });

  const { data: currentUser, refetch: refetchCurrentUser } = useQuery(
    GET_USER,
    {
      variables: { id: user?.id },
    }
  );

  // NOTE/POSSIBLE TO DO!!!! ensure that this logic does not apply to ANY league owner, only owner of THIS league
  const leaguePanelVisible =
    currentUser?.user?.ownedLeagues?.length > 0 && battler?.user?.isVerified;

  useEffect(() => {
    if (data?.battler) {
      setBattler(data.battler);
    }
  }, [data]);

  useEffect(() => {
    if (battler?.battles) {
      console.log(battler.battles);
      // concatenates all battler's battles into idString
      // per youtube API docs, video ids format should be: ["id1,id2,id3"]
      var idString = battler.battles.reduce(
        (accumulator, battle) => accumulator + (battle.battleUrl + ','),
        ''
      );
      idString = idString.replace(/,\s*$/, '');
      api.fetchYouTubeVideos(idString, updateViews);
    }
  }, [battler]);

  const updateViews = (res) => {
    console.log(res);
    const totalViews = res.reduce(
      (accumulator, video) =>
        accumulator + parseInt(video.statistics.viewCount),
      0
    );
    const avgViews = Math.ceil(totalViews / res.length);
    let stats = { totalViews: totalViews, avgViews: avgViews };
    setBattlerStats({ ...stats });
  };

  if (loading) return 'Loading...';

  return battler ? (
    <BattlerPageContainer>
      <div className='user-details-container'>
        <ContentContainer
          flexDirection='column'
          justifyContent='flex-start'
          height={500}
          width={leaguePanelVisible ? 500 : 760}
        >
          <div className='battler-name-container header-container'>
            <div>{battler.name}</div>
            {battler?.user?.isVerified ? (
              <VerifiedUserIcon
                className='verified-icon'
                style={{ fontSize: '0.8em' }}
              />
            ) : null}
          </div>

          {battler?.user?.isVerified ? (
            <div>
              <Avatar
                src={battler.user.profilePictureUrl}
                sx={{ width: 300, height: 300 }}
                className='battlerImage'
                variant={'rounded'}
              />
            </div>
          ) : (
            <div>
              <Avatar
                src={battler.image}
                sx={{ width: 100, height: 100 }}
                className='battlerImage'
                variant={'square'}
              />
            </div>
          )}

          {battler?.user?.socialMediaLinks ? (
            <SocialMediaContainer
              socials={battler.user.socialMediaLinks}
              iconsOnly={true}
            />
          ) : null}
        </ContentContainer>
        <ContentContainer
          flexDirection='column'
          width={leaguePanelVisible ? 500 : 760}
          height={500}
          justifyContent='flex-start'
        >
          <BattlerStatContainer>
            <div className='header-container'>
              <div className='title-text'>Battler Stats</div>
            </div>
            {battler?.league?.leagueName ? (
              <Avatar
                src={battler.league.logoUrl}
                sx={{ width: 400, height: 100, marginBottom: '0.5em' }}
                className='battlerImage'
                variant={'square'}
              />
            ) : (
              <div className='no-league'>
                This battler has not confirmed a homeleague
              </div>
            )}
            <div className='stats-container'>
              <div>Rating: {battler.score}</div>
              <div>
                Record: {battler?.record?.wins} - {battler?.record?.losses}
              </div>

              <div>Number of Battles: {battler.battleCount}</div>
              <div>Total Views: {battlerStats.totalViews}</div>
              <div>Average Views: {battlerStats.avgViews}</div>
            </div>

            <FollowBattlerButton
              battlerId={battlerId}
              currentUser={currentUser?.user}
              refetchCurrentUser={refetchCurrentUser}
            />
          </BattlerStatContainer>
        </ContentContainer>
        {leaguePanelVisible ? (
          <ContentContainer
            flexDirection='column'
            justifyContent='flex-start'
            width={500}
            height={500}
          >
            <LeagueOwnerPanel>
              <div className='header-container'>
                <div className='title-text'>My League</div>
              </div>

              {battler.bookingPrice ? (
                <div>{`Rate per minute: $${battler?.bookingPrice}`}</div>
              ) : null}
              <LeagueOwnerControls
                battler={battler}
                league={currentUser?.user?.ownedLeagues[0]}
                setFlashMessage={setFlashMessage}
              />
            </LeagueOwnerPanel>
          </ContentContainer>
        ) : null}
      </div>
      <UserPageHeadline displayText={`${battler.name} Battles`.toUpperCase()} />
      <ContentContainer grid={true}>
        {battler?.battles?.length > 0
          ? battler.battles.map((battle) => {
              return (
                <BattleLink key={battle.id} battle={battle} size={'large'} />
              );
            })
          : null}
      </ContentContainer>
    </BattlerPageContainer>
  ) : (
    <div>Battler not found</div>
  );
}

export default BattlerPage;
