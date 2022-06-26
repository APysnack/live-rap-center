import React, { useState, useEffect } from "react";
import BasicModal from "../BasicModal";
import { useMutation } from "@apollo/client";
import { CREATE_LEAGUE_LOGO, CREATE_USER_PROFILE_PICTURE } from "./gql";

function ChangeFileForm({ isOpen, onClose, type, refetch }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");

  const [createLeagueLogo, { data: leagueLogoData }] =
    useMutation(CREATE_LEAGUE_LOGO);

  const [createUserProfilePicture, { data: userProfilePicData }] = useMutation(
    CREATE_USER_PROFILE_PICTURE
  );

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (type === "profile picture") {
      createUserProfilePicture({
        variables: { userId: 1, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === "league logo") {
      createLeagueLogo({
        variables: { leagueId: 1, name: fileName, image: file },
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
      <div>THIS IS FOR EDITING USER PROFILE PICTURES</div>
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
