import React from 'react';
import { HeaderBackground, THeadStyled } from './styled';
import { Tr } from '../Row/Tr';

const THead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...rest
}) => {
  return (
    <THeadStyled {...rest}>
      {children}
      <Tr>
        <td colSpan={99}>
          <HeaderBackground />
        </td>
      </Tr>
    </THeadStyled>
  );
};

export default THead;
