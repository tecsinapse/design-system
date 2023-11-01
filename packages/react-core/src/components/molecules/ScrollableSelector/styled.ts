import { LinearGradient } from 'expo-linear-gradient';
import styled from '@emotion/native';
import { StyleProps } from 'packages/react-core/src/types/defaults';

interface MarkProps {
  markTop: number;
  markColor: string;
  markHeight: number;
  markWidth: string | number;
}

export const PickerContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Block = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
`;

export const DigitText = styled.Text<{
  fontSize?: number;
  marginBottom?: number;
  marginTop?: number;
  lineHeight: number;
  height: number;
}>`
  font-size: ${({ fontSize }) => fontSize || 20}px;
  text-align: center;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  line-height: ${({ lineHeight }) => lineHeight || 20}px;
  height: ${({ lineHeight }) => lineHeight || 20}px;
`;

export const Mark = styled.View<MarkProps & Partial<StyleProps>>`
  position: absolute;
  border-radius: 10px;
  top: ${({ markTop }) => markTop};
  background-color: ${({ theme }) => theme.color.primary.light};
  height: ${({ markHeight }) => markHeight};
  width: ${({ markWidth }) => markWidth};
`;

export const Gradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
`;
