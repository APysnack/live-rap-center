import React, { useEffect } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Audiotrack,
  GraphicEq,
} from "@mui/icons-material";

function SocialMediaLink({ type, url }) {
  return (
    <div>
      <a href={url}>
        {(() => {
          switch (type) {
            case "Facebook":
              return <Facebook sx={{ fontSize: 40 }} color="primary" />;
            case "Instagram":
              return <Instagram sx={{ fontSize: 40 }} color="primary" />;
            case "Twitter":
              return <Twitter sx={{ fontSize: 40 }} color="primary" />;
            case "Tiktok":
              return <Audiotrack sx={{ fontSize: 40 }} color="primary" />;
            case "SoundCloud":
              return <GraphicEq sx={{ fontSize: 40 }} color="primary" />;
            default:
              return null;
          }
        })()}
      </a>
    </div>
  );
}

export default SocialMediaLink;
