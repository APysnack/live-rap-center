import React from "react";
import SocialMediaLink from "./SocialMediaLink";
import { SocialMediaContainerWrapper } from "./SocialMediaContainer.styles";

function SocialMediaContainer({ socials }) {
  console.log(socials);
  return (
    <SocialMediaContainerWrapper>
      {Object.keys(socials).map((keyName, i) =>
        socials[keyName]?.url ? (
          <SocialMediaLink key={i} type={keyName} url={socials[keyName].url} />
        ) : null
      )}
    </SocialMediaContainerWrapper>
  );
}

export default SocialMediaContainer;
