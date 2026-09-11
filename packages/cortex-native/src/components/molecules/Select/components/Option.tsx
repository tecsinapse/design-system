import React from 'react';
import { View } from 'react-native';
import PressableSurface from '../../../atoms/PressableSurface/PressableSurface';
import Text from '../../../atoms/Text/Text';
import Checkbox from '../../../atoms/Checkbox/Checkbox';
import RadioButton from '../../../atoms/RadioButton/RadioButton';
import { OptionData, SelectType } from '../types';

interface IOption<Data> {
  item: OptionData<Data>;
  type: SelectType;
  labelExtractor: (t: Data) => string;
  handlePressItem: (t: Data) => void;
}

const Option = <Data,>({
  handlePressItem,
  labelExtractor,
  item,
  type,
}: IOption<Data>): React.ReactElement => {
  const label = labelExtractor(item);

  const Selectable = type === 'multi' ? Checkbox : RadioButton;

  return (
    <PressableSurface
      onPress={() => handlePressItem(item)}
      effect="darken"
      style={{ paddingVertical: 8, paddingHorizontal: 16 }}
    >
      <View pointerEvents="none">
        <Selectable
          color="primary"
          labelPosition="right"
          checked={item._checked}
        >
          <Text
            fontWeight={item._checked ? 'bold' : 'regular'}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {label}
          </Text>
        </Selectable>
      </View>
    </PressableSurface>
  );
};

export default Option;
