import React, { useState, useEffect } from "react";
import BasicModal from "../BasicModal";
import { useMutation } from "@apollo/client";
import {
  CREATE_LEAGUE_LOGO,
  CREATE_USER_PROFILE_PICTURE,
  UPDATE_BATTLE_THUMBNAIL,
} from "./gql";

function ChangeFileForm({ isOpen, onClose, type, refetch, object }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");

  const [createLeagueLogo, { data: leagueLogoData }] =
    useMutation(CREATE_LEAGUE_LOGO);

  const [createUserProfilePicture, { data: userProfilePicData }] = useMutation(
    CREATE_USER_PROFILE_PICTURE
  );

  const [updateBattleThumbnail, { data: battleThumbnailData }] = useMutation(
    UPDATE_BATTLE_THUMBNAIL
  );

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (type === "profile picture") {
      createUserProfilePicture({
        variables: { userId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === "league logo") {
      createLeagueLogo({
        variables: { leagueId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === "battle thumbnail") {
      updateBattleThumbnail({
        variables: { battleId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    }
  };

  const refetchContent = () => {
    onClose();
    refetch();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        <input type="submit" value="Upload" />
      </form>
    </BasicModal>
  );
}

export default ChangeFileForm;
