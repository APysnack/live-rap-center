import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BATTLER, GET_USER } from './gql';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import LeagueOwnerControls from './LeagueOwnerControls';
import SocialMediaContainer from '../SharedComponents/SocialMediaContainer/SocialMediaContainer';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import { Avatar } from '@mui/material';
import FollowBattlerButton from './FollowBattlerButton';
import { Link } from 'react-router-dom';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  BattlerPageContainer,
  AdminPanel,
  LeagueOwnerPanel,
  BattlerStatContainer,
  SocialMediaContentContainer,
} from './BattlerPage.styles';
import BattleLink from '../SharedComponents/BattleLink/BattleLink';

const { REACT_APP_SERVER_URL } = process.env;

function BattlerPage() {
  let { battlerId } = useParams();
  const [flashMessage, setFlashMessage] = useState('');
  const [battler, setBattler] = useState(null);
  const [userViewingPageIsLeagueOwner, setUserViewingPageIsLeagueOwner] =
    useState(false);
  const [battlerStats, setBattlerStats] = useState({
    totalViews: 0,
    avgViews: 0,
  });
  const [userViewingPageIsAdmin, setUserViewingPageIsAdmin] = useState(false);

  const { user } = useSelector((state) => state.user.userState);

  const { loading, data, refetch } = useQuery(GET_BATTLER, {
    variables: { id: battlerId },
  });

  const { data: currentUser, refetch: refetchCurrentUser } = useQuery(
    GET_USER,
    {
      variables: { id: user.id },
    }
  );

  // makes gql query for a battler, if found
  // sets this as the "battler" for this page
  useEffect(() => {
    if (data?.battler) {
      setBattler(data.battler);
    }
  }, [data]);

  // NOTE/POSSIBLE TO DO!!!! ensure that this logic does not apply to ANY league owner, only owner of THIS league
  useEffect(() => {
    if (user?.roles?.includes('league owner')) {
      setUserViewingPageIsLeagueOwner(true);
    }
    if (user?.roles?.includes('admin')) {
      setUserViewingPageIsAdmin(true);
    }
  }, [user]);

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
                src={REACT_APP_SERVER_URL + battler.user.profilePictureUrl}
                sx={{ width: 300, height: 300 }}
                className='battlerImage'
                variant={'rounded'}
              />
            </div>
          ) : (
            <div>
              <Avatar
                src={REACT_APP_SERVER_URL + battler.image}
                sx={{ width: 100, height: 100 }}
                className='battlerImage'
                variant={'square'}
              />
            </div>
          )}
          <SocialMediaContainer
            socials={battler?.user?.socialMediaLinks}
            iconsOnly={true}
          />
        </ContentContainer>
        <ContentContainer
          flexDirection='column'
          width={500}
          height={500}
          justifyContent='flex-start'
        >
          <BattlerStatContainer>
            <div className='header-container'>
              <div className='title-text'>Battler Stats</div>
            </div>
            {battler?.league?.leagueName ? (
              <div>This battler represents {battler.league.leagueName}</div>
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
      </div>
      <ContentContainer width={1200} height={1150}>
        {battler?.battles?.length > 0
          ? battler.battles.map((battle) => {
              return <BattleLink key={battle.id} battle={battle} />;
            })
          : null}
      </ContentContainer>

      {/* {currentUser?.user?.ownedLeagues?.length > 0 &&
      battler?.user?.isVerified ? (
        <ContentContainer>
          <LeagueOwnerPanel>
            <div className='header-container'>
              <div className='title-text'>League Owner Options</div>
            </div>

            {battler.bookingPrice ? (
              <div>{`Rate per minute: $${battler?.bookingPrice}`}</div>
            ) : null}
            <LeagueOwnerControls
              battler={battler}
              league={currentUser.user.ownedLeagues[0]}
              setFlashMessage={setFlashMessage}
            />

            <div>
              <Link
                to='/create-booking'
                className='lrc-button'
                state={{
                  booker: user,
                  talent: battler,
                  bookingType: 'battler',
                }}
              >
                BOOK THIS BATTLER
              </Link>
            </div>
          </LeagueOwnerPanel>
        </ContentContainer>
      ) : null}
      {userViewingPageIsAdmin ? (
        <ContentContainer>
          <AdminPanel>
            <div className='header-container'>
              <div className='title-text'>Admin Options</div>
            </div>
            <ImageUploadModal
              type='battler image'
              object={battler}
              refetch={refetch}
            />
            <div className='lrc-button'>MODIFY BATTLER IMAGE</div>
          </AdminPanel>
        </ContentContainer>
      ) : null} */}
    </BattlerPageContainer>
  ) : (
    <div>Battler not found</div>
  );
}

export default BattlerPage;
