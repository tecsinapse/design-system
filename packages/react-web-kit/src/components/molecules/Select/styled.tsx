import styled from '@emotion/styled';
import { Icon, StyleProps, Text } from '@tecsinapse/react-core';
import React from 'react';

export const StyledContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const StyledInputContainer = styled('div')<Partial<StyleProps>>`
  width: 100%;
`;

export const RightComponent = (
  <Icon
    name="chevron-down"
    type="material-community"
    size="centi"
    style={{ marginRight: 12 }}
  />
);
