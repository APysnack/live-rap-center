import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_USER, GET_BATTLER } from "./gql";
import { useQuery } from "@apollo/client";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";
import SocialMediaForm from "./SocialMediaForm/SocialMediaForm";
import BattlerSettings from "./BattlerSettings/BattlerSettings";

function UserSettingsPage() {
  const { user } = useSelector((state) => state.user.userState);
  const [battler, setBattler] = useState(null);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const {
    loading,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    skip: user?.id ? false : true,
    variables: { id: user?.id },
  });

  useEffect(() => {
    if (userData?.user) {
      setCurrentUser(userData.user);
    }
  }, [userData]);

  const { data } = useQuery(GET_BATTLER, {
    skip: currentUser?.id ? false : true,
    variables: { id: currentUser?.id },
  });

  useEffect(() => {
    if (data?.battler) {
      setBattler(data.battler);
    }
  }, [data]);

  // if the user is not logged in, redirects to login page
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user]);

  if (loading) return "Loading...";

  return (
    <div>
      UserSettingsPage
      <ImageUploadModal
        type="profile picture"
        object={currentUser}
        refetch={refetchUser}
      />
      {battler ? (
        <BattlerSettings user={currentUser} battler={battler} />
      ) : null}
      <SocialMediaForm currentUser={currentUser} refetchUser={refetchUser} />
    </div>
  );
}

export default UserSettingsPage;
