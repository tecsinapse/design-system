import React, { ReactNode } from 'react';
import { SpacingType } from '@tecsinapse/react-core';
import { StyledColumnItem, StyledRowItem, StyledMasonry } from './styled';

export interface MasonryProps {
  columns: number;
  /** Spacing to the left of every block on index % column !== 0 */
  spacingLeft: SpacingType;
  /** Spacing to the top of every block on index >= column */
  spacingTop: SpacingType;
  children?: ReactNode;
}

const Masonry = ({
  children,
  columns,
  spacingTop,
  spacingLeft,
}: MasonryProps): React.ReactElement => {
  const getColumns = () => {
    const columnsArray: React.ReactNode[][] = Array.from(
      { length: columns },
      () => []
    );

    React.Children.forEach(children, (child, index) => {
      if (child && React.isValidElement(child)) {
        columnsArray[index % columns].push(child);
      }
    });

    return columnsArray;
  };

  const renderColumn = column => {
    return column.map((item, index) => (
      <StyledRowItem key={index} index={index} spacingTop={spacingTop}>
        {item}
      </StyledRowItem>
    ));
  };

  const renderColumns = () => {
    return getColumns().map((column, index) => (
      <StyledColumnItem key={index} index={index} spacingLeft={spacingLeft}>
        {renderColumn(column)}
      </StyledColumnItem>
    ));
  };

  return <StyledMasonry>{renderColumns()}</StyledMasonry>;
};

export default Masonry;
