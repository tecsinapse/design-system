import React, { useMemo } from 'react';
import { Divider, SectionHeader } from '../styled';
import { SectionList } from 'react-native';
import { Text } from '../../../atoms/Text';
import { BaseSectionList } from '../types';

const SectionHead = ({
  title,
  groupLabelExtractor,
}: {
  title: string;
  groupLabelExtractor?: (title: string) => string;
}) => (
  <SectionHeader>
    <Text fontWeight={'bold'}>
      {groupLabelExtractor ? groupLabelExtractor(title) : title}
    </Text>
  </SectionHeader>
);

const Section = <Data,>({
  options,
  renderItem,
  getData,
  keyExtractor,
  groupLabelExtractor,
}: BaseSectionList<Data>): React.ReactElement => {
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
      renderSectionHeader={({ section: { title } }) => (
        <SectionHead title={title} groupLabelExtractor={groupLabelExtractor} />
      )}
      keyExtractor={keyExtractor}
    />
  );
};

export default Section;
