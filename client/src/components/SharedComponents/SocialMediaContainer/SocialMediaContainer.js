import React from 'react';
import SocialMediaLink from './SocialMediaLink';
import { SocialMediaContainerWrapper } from './SocialMediaContainer.styles';

function SocialMediaContainer({ socials, iconsOnly = false }) {
  return (
    <SocialMediaContainerWrapper iconsOnly={iconsOnly}>
      {socials.map((social, i) =>
        social?.url ? (
          <SocialMediaLink
            key={i}
            type={social.socialMediaPlatformName}
            url={social.url}
            iconOnly={iconsOnly}
          />
        ) : null
      )}
    </SocialMediaContainerWrapper>
  );
}

export default SocialMediaContainer;
