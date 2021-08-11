import React from 'react';
import { Story } from '@storybook/react';
import TBody from './Body/TBody';
import TableContainer from './Container/TableContainer';
import Th from './Header/Th';
import Tr from './Row/Tr';
import Td from './Cell/Td';
import THead from './Header/THead';
import Table from './Table';

export default {
  title: 'Components/Table',
  component: Table,
};

const Template: Story = () => (
  <TableContainer>
    <Table>
      <THead>
        <Tr>
          <Th>Coluna 1</Th>
          <Th>Coluna 2</Th>
          <Th>Coluna 3</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>Dado 1</Td>
          <Td>Dado 2</Td>
          <Td>Dado 2</Td>
        </Tr>
        <Tr>
          <Td>Dado 3</Td>
          <Td>Dado 4</Td>
          <Td>Dado 4</Td>
        </Tr>
      </TBody>
    </Table>
  </TableContainer>
);

export const Base = Template.bind({});
