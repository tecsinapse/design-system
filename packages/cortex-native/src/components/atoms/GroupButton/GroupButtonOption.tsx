import React from 'react';
import Text, { TextProps } from '../Text/Text';

export interface GroupButtonOptionProps {
  active: boolean;
  description: string;
  TextComponent?: React.ComponentType<TextProps>;
}

const GroupButtonOption = ({
  TextComponent = Text,
  active,
  description,
}: GroupButtonOptionProps): React.ReactElement => {
  return (
    <TextComponent
      fontWeight="bold"
      typography="sub"
      fontColor={active ? 'inverse' : undefined}
      colorVariant={active ? undefined : 'secondary'}
      colorTone={active ? undefined : 'medium'}
    >
      {description}
    </TextComponent>
  );
};

export default GroupButtonOption;
