import React from 'react';
import { SettingsContainer } from './SettingsGroup.styles';
import ContentContainer from '../ContentContainer/ContentStyleWrapper';

function SettingsGroup({
  width = 32,
  height = 50,
  alignItems = 'flex-start',
  settingsProps,
  shadowWidth = 24,
  headerWidth = 25,
}) {
  return (
    <ContentContainer
      width={`${width + 2}vw`}
      height={`${height}vh`}
      alignItems={alignItems}
    >
      <SettingsContainer>
        <div className='header' style={{ width: `${headerWidth}vw` }}>
          {settingsProps.header}
        </div>
        <div className='settings-content'>
          {settingsProps.components.map((component) => {
            return (
              <div
                key={`${component.title}-element`}
                className={
                  component?.backgroundDisabled ? '' : 'form-container'
                }
                style={{
                  width: `${shadowWidth}vw`,
                  overflow: component.scrollEnabled ? 'scroll' : null,
                }}
              >
                <div className='subheading'>{component.title}</div>
                {component.component()}
              </div>
            );
          })}
        </div>
      </SettingsContainer>
    </ContentContainer>
  );
}

export default SettingsGroup;
