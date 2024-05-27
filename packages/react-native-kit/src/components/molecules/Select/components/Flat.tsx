import React from 'react';
import { Divider } from '../styled';
import { FlatList } from 'react-native';
import { BaseFlatList } from '../types';

const Flat = <Data,>({
  options,
  keyExtractor,
  renderItem,
  getData,
}: BaseFlatList<Data>): JSX.Element => {
  const data = React.useMemo(
    () => (typeof options !== 'function' ? getData(options) : []),
    [options, getData]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      fadingEdgeLength={200}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default Flat;
