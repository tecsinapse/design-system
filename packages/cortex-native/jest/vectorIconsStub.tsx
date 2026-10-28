import React from 'react';
import { Text, type TextProps } from 'react-native';

/**
 * Stand-in for every `react-native-vector-icons/<Set>` entry point under jest.
 *
 * The real modules ship untranspiled ESM and blow up in the react-native jest
 * preset, which is why component tests historically had to mock our own `Icon`
 * module instead of rendering it. The stub forwards `className`, `testID` and
 * `style` verbatim so tests can assert what `Icon` actually composes.
 */
const VectorIconStub = ({
  name,
  ...rest
}: TextProps & { name?: string }): React.ReactElement => (
  <Text {...rest}>{name}</Text>
);

export default VectorIconStub;
