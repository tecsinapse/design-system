import styled from '@emotion/native';
import { PressableSurface, PressableSurfaceProps } from '../../atoms/PressableSurface';
import { StyleProps } from '../../../types/defaults';
import { View } from 'react-native';
import { RFValueStr } from '../../../utils/ResponsiveFontSize';

export const StyledCountryOption = styled(PressableSurface)<
  PressableSurfaceProps & Partial<StyleProps>
>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.centi}
    ${({ theme }) => theme.spacing.deca};
  min-height: ${RFValueStr('32px')};
`;

export const StyledDialCode = styled(View)`
  flex-shrink: 0;
`;

export const StyledCountrySelectorRoot = styled(View)<Partial<StyleProps>>`
  flex-direction: column;
  width: 100%;
`;

export const StyledSearchContainer = styled(View)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
`;

export const StyledFlagTrigger = styled(PressableSurface)<
  PressableSurfaceProps & Partial<StyleProps>
>`
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  min-width: ${RFValueStr('56px')};
  padding-left: ${({ theme }) => theme.spacing.mili};
  gap: ${({ theme }) => theme.spacing.mili};
`;

export const StyledPhoneInputField = styled(View)<Partial<StyleProps>>`
  flex: 1;
  min-width: 0;
`;

export const StyledPhoneInputRoot = styled(View)<Partial<StyleProps>>`
  width: 100%;
`;
