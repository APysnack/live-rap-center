import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import ImageUploadModal from '../../SharedComponents/ImageUploadModal/ImageUploadModal';
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import AddBattleToEvent from './AddBattleToEvent/AddBattleToEvent';
import {
  BattleListContainer,
  UpdateEventPageWrapper,
  FlyerUploadWrapper,
} from './UpdateEventPage.styles';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import Loading from '../../SharedComponents/Loading/Loading';
import BasicModal from '../../SharedComponents/BasicModal';

function UpdateEventPage() {
  const [event, setEvent] = useState(null);
  const [addBattleModalVisible, setAddBattleModalVisible] = useState(false);

  const location = useLocation();
  const { eventId } = location.state || {};

  const { loading, data, refetch, error } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    options: {
      awaitRefetchQueries: true,
    },
  });

  useEffect(() => {
    if (data?.event) {
      setEvent(data.event);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <UpdateEventPageWrapper>
      <BasicModal
        width={1100}
        height={750}
        isOpen={addBattleModalVisible}
        onClose={() => setAddBattleModalVisible(false)}
      >
        <AddBattleToEvent />
      </BasicModal>

      {event ? (
        <div className='event-details-container'>
          <div>
            <ContentContainer width={850} height={810}>
              <CreateEventForm event={event} refetch={refetch} type='update' />
            </ContentContainer>
            <ContentContainer width={850} height={300}>
              <FlyerUploadWrapper>
                <div className='flyer-text'>Upload flyer image</div>
                <ImageUploadModal
                  type='event flyer'
                  object={event}
                  refetch={refetch}
                />
              </FlyerUploadWrapper>
            </ContentContainer>
          </div>
          <div>
            <ContentContainer width={750} height={510}>
              <BattleListContainer>
                <div className='header-container'>Scheduled Battles</div>
                <div className='scroll-section'>
                  {event?.battles
                    ? event.battles.map((battles, i) => (
                        <div key={i} className='battle-container'>
                          {battles.battlers.map((battler, i) =>
                            i % 2 === 0 ? (
                              <>
                                <div
                                  className='battler-container'
                                  key={battler.id}
                                >
                                  {battler.name.toUpperCase()}
                                </div>
                                <div className='versus'>VS</div>
                              </>
                            ) : (
                              <div
                                className='battler-container battler-container-right'
                                key={battler.id}
                              >
                                {battler.name.toUpperCase()}
                              </div>
                            )
                          )}
                        </div>
                      ))
                    : null}
                </div>

                <div
                  className='lrc-button'
                  onClick={() => setAddBattleModalVisible(true)}
                >
                  Add battle
                </div>
              </BattleListContainer>
            </ContentContainer>
          </div>
        </div>
      ) : null}
    </UpdateEventPageWrapper>
  );
}

export default UpdateEventPage;
