import React from 'react';
import { Story } from '@storybook/react';
import TBody from './Body/TBody';
import TableContainer from './Container/TableContainer';
import Th from './Header/Th';
import Tr from './Row/Tr';
import Td from './Cell/Td';
import THead from './Header/THead';
import Table from './Table';
import TableToolbar from './Toolbar/TableToolbar';
import { Input } from '../Input';
import TFoot from './Footer/TFoot';
import { Button } from '../Button';
import { Text } from '@tecsinapse/react-core';
import styled from '@emotion/styled';

export default {
  title: 'Components/Table',
  component: Table,
};

const TdStyled = styled(Td)`
  padding: 12px 0 0 0;
`;

const Template: Story = () => (
  <TableContainer>
    <TableToolbar
      title="Tabela"
      rightIcons={<Input placeholder="Digite sua busca" />}
    />
    <Table>
      <THead>
        <Tr>
          <Th>Coluna 1</Th>
          <Th>Coluna 2</Th>
          <Th>Coluna 3</Th>
          <Th>Coluna 4</Th>
        </Tr>
      </THead>

      <TBody>
        <Tr>
          <Td>Linha 1</Td>
          <Td>Linha 1</Td>
          <Td>Linha 1</Td>
          <Td>Linha 1</Td>
        </Tr>
        <Tr>
          <Td>Linha 2</Td>
          <Td>Linha 2</Td>
          <Td>Linha 2</Td>
          <Td>Linha 2</Td>
        </Tr>
      </TBody>
      <TFoot>
        <Tr>
          <TdStyled colSpan={99}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined">
                <Text fontColor="orange" fontWeight="bold">
                  Exportar
                </Text>
              </Button>
              <div
                style={{
                  display: 'flex',
                  width: 125,
                  justifyContent: 'space-between',
                }}
              >
                <Button>
                  <Text fontColor="light" typography="h5">
                    {'<'}
                  </Text>
                </Button>
                <Button>
                  <Text fontColor="light" typography="h5">
                    {'>'}
                  </Text>
                </Button>
              </div>
            </div>
          </TdStyled>
        </Tr>
      </TFoot>
    </Table>
  </TableContainer>
);

export const Base = Template.bind({});
