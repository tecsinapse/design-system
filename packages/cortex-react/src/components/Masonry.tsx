import clsx from 'clsx';
import React, { ReactNode } from 'react';

export interface MasonryProps {
  columns: number;
  /** child element */
  children?: ReactNode;
}

const Masonry = ({ children, columns }: MasonryProps): JSX.Element => {
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

  const renderColumn = (column: React.ReactNode[]) => {
    return column.map((item, index) => {
      return (
        <div className={index > 0 ? 'mt-deca' : 'mt-0'} key={index}>
          {item}
        </div>
      );
    });
  };

  const renderColumns = () => {
    return getColumns().map((column, index) => {
      return (
        <div
          className={clsx(
            'width-0 flex flex-1 flex-col content-start',
            index > 0 ? 'ml-deca' : 'ml-0'
          )}
          key={index}
        >
          {renderColumn(column)}
        </div>
      );
    });
  };

  return (
    <div
      data-testid={'masonry'}
      className={
        'box-border flex w-full flex-row content-stretch justify-center'
      }
    >
      {renderColumns()}
    </div>
  );
};

export default Masonry;
