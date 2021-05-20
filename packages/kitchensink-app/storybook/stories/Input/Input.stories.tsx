import styled from '@emotion/native';
import { storiesOf } from '@storybook/react-native';
import { Input, StyleProps } from '@tecsinapse/react-web-kit/src';
import React from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Input', module)
  .addDecorator((getStory) => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Input', () => <StyledInput />)


const StyledInput = styled(Input)<Partial<StyleProps>>`
  /* background-color: red; */
`