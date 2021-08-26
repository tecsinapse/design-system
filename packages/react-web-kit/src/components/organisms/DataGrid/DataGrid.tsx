import React from 'react';
import { Button, Checkbox, Icon, Text } from '@tecsinapse/react-core';
import {
  Table,
  TableToolbar,
  TableContainer,
  Tr,
  Td,
  TFoot,
  TBody,
} from '../../atoms/Table';
import {
  CheckboxCell,
  FlexContainer,
  FooterContainer,
  TdFooterStyled,
} from './styled';
import { Header } from './Header';
import { HeadersType } from './types';

export interface DataGridProps<Data> {
  headers: HeadersType<Data>[];
  data: Data[];
  /** Unique identifier for row data */
  rowKeyExtractor: (data: Data) => string;
  toolbarRightIcons?: React.ReactNode;
  toolbarFooter?: React.ReactNode;
  toolbarTitle: string;
  selectable?: boolean;
  /** Selected items */
  selected?: Data[];
  /** Selection handler */
  setSelected?: (data: Data, checked: boolean) => void;
  /** Select all handler */
  setSelectAll?: () => void;
}

const DataGrid = <Data extends unknown>({
  headers,
  data,
  rowKeyExtractor,
  toolbarTitle,
  toolbarFooter,
  toolbarRightIcons,
  selectable = false,
  selected = [],
  setSelected,
  setSelectAll,
}: DataGridProps<Data>): JSX.Element => {
  return (
    <TableContainer>
      <TableToolbar
        title={toolbarTitle}
        rightIcons={toolbarRightIcons}
        footer={toolbarFooter}
      />
      <Table>
        <Header
          selectable={selectable}
          setSelectAll={setSelectAll}
          headers={headers}
          dataLenght={data.length}
          selectedLenght={selected?.length}
        />

        <TBody>
          {data.map(item => (
            <Tr key={rowKeyExtractor(item)}>
              {selectable && (
                <CheckboxCell>
                  <Checkbox
                    checked={selected?.some(
                      sel => rowKeyExtractor(sel) === rowKeyExtractor(item)
                    )}
                    onChange={checked => setSelected?.(item, checked)}
                  />
                </CheckboxCell>
              )}
              {headers.map(({ label, render }) => (
                <Td key={`row-${rowKeyExtractor(item)}-column-${label}`}>
                  {render(item)}
                </Td>
              ))}
            </Tr>
          ))}
        </TBody>

        <TFoot>
          <Tr>
            <TdFooterStyled colSpan={99}>
              <FooterContainer>
                <Button variant="outlined">
                  <Text fontColor="orange" fontWeight="bold">
                    Exportar
                  </Text>
                </Button>
                <FlexContainer>
                  <Button>
                    <Icon
                      name={'chevron-left'}
                      type={'material-community'}
                      fontColor={'light'}
                    />
                  </Button>
                  <Button>
                    <Icon
                      name={'chevron-right'}
                      type={'material-community'}
                      fontColor={'light'}
                    />
                  </Button>
                </FlexContainer>
              </FooterContainer>
            </TdFooterStyled>
          </Tr>
        </TFoot>
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
