import { LinearGradient } from 'expo-linear-gradient';
import styled from '@emotion/native';
import { ScrollView } from 'react-native';
import { RFValue, StyleProps } from '@tecsinapse/react-native-kit';

interface MarkProps {
  markTop: number;
  markColor: string;
  markHeight: number;
  markWidth: number;
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
export const BlockLabels = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20px;
`;
export const Scroll = styled.ScrollView`
  width: 100%;
`;

export const DigitText = styled.Text<{
  fontSize: number;
  marginBottom: number;
  marginTop: number;
  lineHeight: number;
  height: number;
}>`
  font-size: ${({ fontSize }) => `${RFValue(fontSize)}px`};
  text-align: center;
  color: #000000;
  margin-bottom: ${({ marginBottom }) => `${RFValue(marginBottom)}px`};
  margin-top: ${({ marginTop }) => `${RFValue(marginTop)}px`};
  line-height: ${({ lineHeight }) => `${RFValue(lineHeight)}px`};
  height: ${({ height }) => `${RFValue(height)}px`};
`;

export const Mark = styled.View<MarkProps & Partial<StyleProps>>`
  position: absolute;
  border-radius: 10px;
  top: ${({ markTop }) => `${RFValue(markTop)}px`};
  background-color: ${({ theme }) => theme.color.primary.light};
  height: ${({ markHeight }) => `${RFValue(markHeight)}px`};
  width: ${({ markWidth }) => `${RFValue(markWidth)}px`};
`;

export const Gradient = styled(LinearGradient)`
  position: absolute;
  width: 100%;
`;

export const StyledScrollView = styled(ScrollView)`
  width: 100%;
`;
