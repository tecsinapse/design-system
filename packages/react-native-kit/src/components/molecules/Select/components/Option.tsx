import React from 'react';
import { ListItem, StyledTextItemSelect } from '../styled';
import { View } from 'react-native';
import { OptionData, SelectType } from '../types';
import { Checkbox, RadioButton } from '@tecsinapse/react-core';

interface IOption<Data> {
  item: OptionData<Data>;
  type: SelectType;
  labelExtractor: (t: Data) => string;
  handlePressItem: (t: Data) => void;
}

const Component = <Data,>({
  handlePressItem,
  labelExtractor,
  item,
  type,
}: IOption<Data>): JSX.Element => {
  const label = labelExtractor(item);

  return (
    <ListItem onPress={() => handlePressItem(item)}>
      <View pointerEvents={'none'}>
        {type === 'multi' ? (
          <Checkbox
            color={'primary'}
            labelPosition={'right'}
            checked={item._checked}
          >
            <StyledTextItemSelect
              fontWeight={item._checked ? 'bold' : 'regular'}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {label}
            </StyledTextItemSelect>
          </Checkbox>
        ) : (
          <RadioButton
            color={'primary'}
            labelPosition={'right'}
            checked={item._checked}
          >
            <StyledTextItemSelect
              fontWeight={item._checked ? 'bold' : 'regular'}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {label}
            </StyledTextItemSelect>
          </RadioButton>
        )}
      </View>
    </ListItem>
  );
};

export default Component;
