import React, { useMemo } from 'react';
import { Divider, SectionHeader } from '../styled';
import { SectionList } from 'react-native';
import { Text } from '../../../atoms/Text';

const SectionHead = ({ section: { title } }) => (
  <SectionHeader>
    <Text fontWeight={'bold'}>{title}</Text>
  </SectionHeader>
);

const Section = ({ options, renderItem, getData, keyExtractor }) => {
  const sectionList = useMemo(
    () =>
      options instanceof Map
        ? [...options].map(([key, value]) => ({
            title: key,
            data: getData(value),
          }))
        : [],
    [options, getData]
  );

  return (
    <SectionList
      sections={sectionList}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      renderSectionHeader={SectionHead}
      keyExtractor={keyExtractor}
    />
  );
};

export default Section;
