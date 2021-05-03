import React from 'react';
import { View } from 'react-native';
import { Text, Paper, typography, spacings } from '@tecsinapse/react-core';
import styled from '@emotion/native';

export const Card = (): JSX.Element => {
  return (
    <CardStyle>
      <View>
        <TextTitle>Title</TextTitle>
        <TextInfo>
          Text description Text description Text description Text description
          Text description Text description Text description Text description
        </TextInfo>
      </View>
    </CardStyle>
  );
};

const CardStyle = styled(Paper)`
  width: 400px;
  min-height: 120px;
  max-width: 90vw;
  max-height: 90vh;
  margin-bottom: 1rem;
  padding-top: ${spacings.centi};
  padding-left: ${spacings.deca};
`;

const TextTitle = styled(Text)`
  ${typography.headings.h1};
  color: black;
`;

const TextInfo = styled(Text)`
  padding-top: ${spacings.mili};
  padding-left: ${spacings.micro};
  ${typography.text.base};
  color: black;
`;
