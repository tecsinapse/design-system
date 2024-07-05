import React, { Dispatch, useState } from 'react';
import { DefaultProps } from './interface';
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from 'react-icons/io5';

interface ItemProps<T> extends DefaultProps {
  children?: React.ReactNode;
  subItems?: T[];
  renderSubItems?: (prop: T) => React.ReactNode;
}

const IconControlSubItem = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const props = {
    className: 'text-primary-medium hover:cursor-pointer',
  };
  return (
    <div
      onClick={e => {
        e.stopPropagation();
        setShow(!show);
      }}
    >
      {show ? (
        <IoCaretUpCircleOutline {...props} />
      ) : (
        <IoCaretDownCircleOutline {...props} />
      )}
    </div>
  );
};

const Item = <T,>({
  children,
  subItems,
  renderSubItems,
  ...rest
}: ItemProps<T>) => {
  const [showSubItem, setShowSubItem] = useState(false);
  const hasSubItems = (subItems ?? []).length > 0;
  return (
    <>
      <div className={'flex flex-row gap-x-deca items-center'} {...rest}>
        <div
          className={
            'text-secondary-dark hover:text-primary-medium hover:cursor-pointer text-base'
          }
        >
          {children}
        </div>
        {hasSubItems ? (
          <IconControlSubItem show={showSubItem} setShow={setShowSubItem} />
        ) : (
          <></>
        )}
      </div>
      {showSubItem ? (
        <>{subItems?.map(subItem => renderSubItems?.(subItem))}</>
      ) : (
        <></>
      )}
    </>
  );
};

export default Item;
