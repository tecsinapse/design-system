import React, { useMemo } from 'react';
import { SectionList } from 'react-native';
import Divider from '../../../atoms/Divider/Divider';
import Text from '../../../atoms/Text/Text';
import { BaseSectionList } from '../types';

const SectionHead = ({
  title,
  groupLabelExtractor,
}: {
  title: string;
  groupLabelExtractor?: (title: string) => string;
}) => (
  <Divider linePosition="top">
    <Text
      fontWeight="bold"
      style={{ paddingHorizontal: 16, paddingVertical: 12 }}
    >
      {groupLabelExtractor ? groupLabelExtractor(title) : title}
    </Text>
  </Divider>
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
      ItemSeparatorComponent={() => <Divider linePosition="bottom" />}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHead title={title} groupLabelExtractor={groupLabelExtractor} />
      )}
      keyExtractor={keyExtractor}
    />
  );
};

export default Section;
