import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";
import SocialMediaForm from "./SocialMediaForm/SocialMediaForm";
import BattlerSettings from "./BattlerSettings/BattlerSettings";

function UserSettingsPage() {
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();

  // if the user is not logged in, redirects to login page
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      UserSettingsPage
      <ImageUploadModal />
      <BattlerSettings user={user} />
      <SocialMediaForm />
    </div>
  );
}

export default UserSettingsPage;
