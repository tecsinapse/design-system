import React from 'react';
import { Divider } from '../styled';
import { FlatList } from 'react-native';

const Flat = ({ options, keyExtractor, renderItem, getData }) => {
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
