import React from 'react';
import { FlatList } from 'react-native';
import Divider from '../../../atoms/Divider/Divider';
import { BaseFlatList } from '../types';

const Flat = <Data,>({
  options,
  keyExtractor,
  renderItem,
  getData,
}: BaseFlatList<Data>): React.ReactElement => {
  const data = React.useMemo(
    () => (typeof options !== 'function' ? getData(options) : []),
    [options, getData]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Divider linePosition="bottom" />}
      renderItem={renderItem}
    />
  );
};

export default Flat;
