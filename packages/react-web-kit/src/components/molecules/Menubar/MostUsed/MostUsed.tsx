import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { StyledCard, StyledCardContainer } from './styled';
import { MostUsedType } from '../types';

interface MostUsedProps {
  data: MostUsedType[];
  label: string;
}

const MostUsed: React.FC<MostUsedProps> = ({ data, label }) => {
  const noTextDecoration = { textDecoration: 'none' };

  return (
    <>
      <Text fontWeight="bold">{label}</Text>
      <StyledCardContainer>
        {data
          .slice(0, 4)
          .map(
            ({
              title,
              category,
              Component = 'a',
              props = {},
            }: MostUsedType) => (
              <Component
                {...props}
                style={noTextDecoration}
                key={`${title}-${category}`}
              >
                <StyledCard elevated key={`${title}-${category}`}>
                  <Text fontWeight="bold" colorVariant="primary">
                    {title}
                  </Text>
                  <Text
                    fontWeight="bold"
                    colorVariant="secondary"
                    typography="label"
                  >
                    {category}
                  </Text>
                </StyledCard>
              </Component>
            )
          )}
      </StyledCardContainer>
    </>
  );
};

export default MostUsed;
