import React from "react";
import SocialMediaLink from "./SocialMediaLink";
import { SocialMediaContainerWrapper } from "./SocialMediaContainer.styles";

function SocialMediaContainer({ socials }) {
  return (
    <SocialMediaContainerWrapper>
      {Object.keys(socials).map((keyName, i) => (
        <SocialMediaLink key={i} type={keyName} url={socials[keyName]} />
      ))}
    </SocialMediaContainerWrapper>
  );
}

export default SocialMediaContainer;
