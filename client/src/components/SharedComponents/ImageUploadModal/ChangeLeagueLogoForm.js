import React, { useState, useEffect } from "react";
import BasicModal from "../BasicModal";
import { useMutation } from "@apollo/client";
import { CREATE_LEAGUE_LOGO } from "./gql";

function ChangeLeagueLogoForm({ isOpen, onClose, refetch }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [createLeagueLogo, { data }] = useMutation(CREATE_LEAGUE_LOGO);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createLeagueLogo({
      variables: { leagueId: 1, name: fileName, image: file },
      onCompleted: refetchContent,
    });
  };

  const refetchContent = () => {
    onClose();
    refetch();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <div>THIS IS FOR EDITING LEAGUE LOGOS</div>
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

export default ChangeLeagueLogoForm;
