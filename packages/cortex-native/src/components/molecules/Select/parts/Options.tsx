import React from 'react';
import { ActivityIndicator, ListRenderItemInfo, View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Flat from '../components/Flat';
import Section from '../components/Section';
import { OptionData } from '../types';

export interface SelectOptionsProps<Data> extends ViewProps {
  options: Data[] | Map<string, Data[]>;
  getData: (options: Data[]) => OptionData<Data>[];
  renderItem: (item: ListRenderItemInfo<OptionData<Data>>) => React.ReactElement;
  keyExtractor: (t: Data, index?: number) => string;
  groupLabelExtractor?: (title: string) => string;
  loading?: boolean;
}

const Options = <Data,>({
  className,
  options,
  getData,
  renderItem,
  keyExtractor,
  groupLabelExtractor,
  loading,
  ...rest
}: SelectOptionsProps<Data>): React.ReactElement => (
  <>
    {loading ? <ActivityIndicator color="grey" size="large" /> : null}
    <View {...rest} className={cn('flex-1', className)}>
      {options instanceof Map ? (
        <Section
          options={options}
          getData={getData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          groupLabelExtractor={groupLabelExtractor}
        />
      ) : (
        <Flat
          renderItem={renderItem}
          getData={getData}
          options={options}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  </>
);

Options.displayName = 'Select.Options';

export default Options;
