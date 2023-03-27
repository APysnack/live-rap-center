import React from 'react';
import SocialMediaLink from './SocialMediaLink';
import { SocialMediaContainerWrapper } from './SocialMediaContainer.styles';

function SocialMediaContainer({ socials }) {
  return (
    <SocialMediaContainerWrapper>
      {socials.map((social, i) =>
        social?.url ? (
          <SocialMediaLink
            key={i}
            type={social.socialMediaPlatformName}
            url={social.url}
          />
        ) : null
      )}
    </SocialMediaContainerWrapper>
  );
}

export default SocialMediaContainer;
