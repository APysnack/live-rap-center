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

const { REACT_APP_SERVER_URL } = process.env;

function BattlerPage() {
  let { battlerId } = useParams();
  const [flashMessage, setFlashMessage] = useState('');
  const [battlerSocials, setBattlerSocials] = useState({});
  const [battler, setBattler] = useState(null);
  const [userViewingPageIsThisBattler, setUserViewingPageIsThisBattler] =
    useState(false);
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
      if (
        data.battler.user?.id &&
        user?.id &&
        parseInt(data.battler.user?.id) === parseInt(user?.id)
      ) {
        setUserViewingPageIsThisBattler(true);
      }
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
      // concatenates all battler's battles into idString
      // per youtube API docs, video ids format should be: ["id1,id2,id3"]
      var idString = battler.battles.reduce(
        (accumulator, battle) => accumulator + (battle.battleUrl + ','),
        ''
      );
      idString = idString.replace(/,\s*$/, '');
      api.fetchYouTubeVideos(idString, updateViews);
    }
    if (battler?.user?.socialMediaLinks.length > 0) {
      let newSocials = {};
      battler.user.socialMediaLinks.map((social) => {
        let tempObj = {
          [social.socialMediaPlatformName]: {
            platform_id: social.id,
            url: social.url,
          },
        };
        newSocials = { ...newSocials, ...tempObj };
      });
      setBattlerSocials({ ...newSocials });
    }
  }, [battler]);

  const updateViews = (res) => {
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

  return (
    <>
      <div>{flashMessage}</div>
      {battler ? (
        <div>
          {userViewingPageIsThisBattler ? (
            <div>This is your battler page</div>
          ) : null}
          <div>Battler Name: {battler.name}</div>
          {battler?.user?.isVerified ? (
            <div>
              <div>VERIFIED LRC USER</div>
              <Avatar
                src={REACT_APP_SERVER_URL + battler.user.profilePictureUrl}
                sx={{ width: 100, height: 100 }}
                className='battlerImage'
              />
            </div>
          ) : (
            <div>
              <div>USER NOT VERIFIED</div>
              <Avatar
                src={REACT_APP_SERVER_URL + battler.image}
                sx={{ width: 100, height: 100 }}
                className='battlerImage'
              />
            </div>
          )}
          {battler?.league?.leagueName ? (
            <div>This battler represents {battler.league.leagueName}</div>
          ) : (
            <div>This battler has not confirmed a homeleague</div>
          )}
          <div>This battler's rating is {battler.score}</div>
          <div>Number of Battles: {battler.battleCount}</div>
          <div>Total Views: {battlerStats.totalViews}</div>
          <div>Average Views: {battlerStats.avgViews}</div>
          <div>Wins: {battler?.record?.wins}</div>
          <div>Losses: {battler?.record?.losses}</div>
          <FollowBattlerButton
            battlerId={battlerId}
            currentUser={currentUser?.user}
            refetchCurrentUser={refetchCurrentUser}
          />
          {Object.keys(battlerSocials).length > 0 ? (
            <SocialMediaContainer socials={battlerSocials} />
          ) : null}

          {currentUser?.user?.ownedLeagues?.length > 0 ? (
            <LeagueOwnerControls
              battler={battler}
              league={currentUser.user.ownedLeagues[0]}
              setFlashMessage={setFlashMessage}
            />
          ) : null}
          {battler?.user?.isVerified ? (
            <div>
              {battler.bookingPrice ? (
                <div>{`Rate per minute: $${battler?.bookingPrice}`}</div>
              ) : null}
              <Link
                to='/create-booking'
                state={{
                  booker: user,
                  talent: battler,
                  bookingType: 'battler',
                }}
              >
                BOOK THIS BATTLER
              </Link>
            </div>
          ) : null}
          {userViewingPageIsAdmin ? (
            <>
              <div>ADMIN ONLY: MODIFY BATTLER IMAGE</div>
              <ImageUploadModal
                type='battler image'
                object={battler}
                refetch={refetch}
              />
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default BattlerPage;
