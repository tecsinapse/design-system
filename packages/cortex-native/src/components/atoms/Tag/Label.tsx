import React from 'react';
import Text, { TextProps } from '../Text/Text';

export type LabelProps = TextProps;

const Label: React.FC<LabelProps> = ({ children, ...rest }) => <Text {...rest}>{children}</Text>;

Label.displayName = 'Tag.Label';

export default Label;
