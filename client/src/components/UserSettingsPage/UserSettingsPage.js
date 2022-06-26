import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_BATTLER } from "./gql";
import { useQuery } from "@apollo/client";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";
import SocialMediaForm from "./SocialMediaForm/SocialMediaForm";
import BattlerSettings from "./BattlerSettings/BattlerSettings";

function UserSettingsPage() {
  const { user } = useSelector((state) => state.user.userState);
  const [battler, setBattler] = useState(null);
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_BATTLER, {
    variables: { id: user.id },
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
      <ImageUploadModal type="profile picture" />
      {battler ? <BattlerSettings user={user} battler={battler} /> : null}
      <SocialMediaForm />
    </div>
  );
}

export default UserSettingsPage;
