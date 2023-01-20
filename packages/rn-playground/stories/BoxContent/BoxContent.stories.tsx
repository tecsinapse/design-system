import styled from '@emotion/native';
import { Text, BoxContent } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof BoxContent> = {
  title: 'BoxContent',
  component: BoxContent,
  args: {
    variant: 'bottom',
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof BoxContent>;

export const Base = (args: IStory) => {
  const variant = args?.args?.variant ?? 'bottom';

  return (
    <StyledBoxContent variant={variant}>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
      <Text>Some text here!</Text>
    </StyledBoxContent>
  );
};

const StyledBoxContent = styled(BoxContent)`
  align-items: center;
`;
