import React, { useState, useEffect } from "react";
import { GET_USER_BATTLER } from "./gql";
import { useQuery } from "@apollo/client";
import { Delete } from "@mui/icons-material";
import { HomeLeagueWrapper } from "./BattlerSettings.styles";
import ConfirmationModal from "../../SharedComponents/ConfirmationModal/ConfirmationModal";
import { REMOVE_HOME_LEAGUE } from "./gql";
import { useMutation } from "@apollo/client";

function BattlerSettings({ user }) {
  const { loading, data } = useQuery(GET_USER_BATTLER, {
    skip: !user?.id,
    variables: { userId: user?.id },
  });

  const [homeLeague, setHomeLeague] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteLeague] = useMutation(REMOVE_HOME_LEAGUE);

  useEffect(() => {
    if (data?.battler?.league?.leagueName) {
      setHomeLeague(data?.battler?.league?.leagueName);
    }
  }, [data]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const removeHomeLeague = () => {
    if (user?.id) {
      deleteLeague({
        variables: { userId: user.id },
      });
      closeModal();
      setHomeLeague(null);
    }
  };

  return (
    <div>
      {homeLeague ? (
        <HomeLeagueWrapper>
          <div> Home League: {homeLeague}</div>
          <Delete onClick={openModal} className="delete" />
        </HomeLeagueWrapper>
      ) : (
        <div>No home league. You must be invited to join a home league</div>
      )}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={removeHomeLeague}
        onDeny={closeModal}
      />
    </div>
  );
}

export default BattlerSettings;
