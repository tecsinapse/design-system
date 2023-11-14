import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { ScrollView } from 'react-native';

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
  margin-bottom: 5px;
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
  font-size: ${({ fontSize }) => `${fontSize}px`};
  text-align: center;
  color: #000000;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  line-height: ${({ lineHeight }) => `${lineHeight}px`};
  height: ${({ height }) => `${height}px`};
`;

export const Mark = styled.View<MarkProps & Partial<StyleProps>>`
  position: absolute;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.primary.light};
  height: ${({ markHeight }) => `${markHeight}px`};
  width: ${({ markWidth }) => `${markWidth}px`};
`;

export const StyledScrollView = styled(ScrollView)`
  width: 100%;
`;
