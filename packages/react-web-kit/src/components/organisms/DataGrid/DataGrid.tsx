import React from 'react';
import { Button, Checkbox, Icon, Text } from '../../../index';
import {
  Table,
  TableToolbar,
  TableContainer,
  Th,
  Tr,
  Td,
  THead,
  TFoot,
  TBody,
} from '../../atoms/Table';
import {
  CheckboxCell,
  CheckboxHeader,
  FlexContainer,
  FooterContainer,
  TdFooterStyled,
} from './styled';

type HeadersType<Data> = {
  label: string;
  render: (data: Data) => React.ReactNode;
};

export interface DataGridProps<Data> {
  headers: HeadersType<Data>[];
  data: Data[];
  rowKeyExtractor: (data: Data) => string;
  toolbarRightIcons?: React.ReactNode;
  toolbarFooter?: React.ReactNode;
  toolbarTitle: string;
  selectable?: boolean;
  selected?: Data[];
  setSelected?: (data: Data, checked: boolean) => void;
  setSelectAll?: () => void;
}

const DataGrid = <Data extends unknown>({
  headers = [],
  data = [],
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
        <THead>
          <Tr>
            {selectable && (
              <CheckboxHeader>
                <Checkbox
                  checked={data.length === selected?.length}
                  onChange={() => setSelectAll?.()}
                />
              </CheckboxHeader>
            )}
            {headers.map(({ label }) => (
              <Th key={label}>{label}</Th>
            ))}
          </Tr>
        </THead>

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
