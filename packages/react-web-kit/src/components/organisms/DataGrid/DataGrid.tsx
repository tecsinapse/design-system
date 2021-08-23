import React from 'react';
import TableToolbar from '../../atoms/Table/Toolbar/TableToolbar';
import { Button, Text } from '@tecsinapse/react-web-kit';
import Table from '../../atoms/Table/Table';
import THead from '../../atoms/Table/Header/THead';
import Tr from '../../atoms/Table/Row/Tr';
import Th from '../../atoms/Table/Header/Th';
import TBody from '../../atoms/Table/Body/TBody';
import Td from '../../atoms/Table/Cell/Td';
import TFoot from '../../atoms/Table/Footer/TFoot';
import TableContainer from '../../atoms/Table/Container/TableContainer';
import { FlexContainer, FooterContainer, TdFooterStyled } from './styled';

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
}

const DataGrid = <Data extends unknown>({
  headers = [],
  data = [],
  rowKeyExtractor,
  toolbarTitle,
  toolbarFooter,
  toolbarRightIcons,
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
            {headers.map(({ label }) => (
              <Th key={label}>{label}</Th>
            ))}
          </Tr>
        </THead>

        <TBody>
          {data.map(item => (
            <Tr key={rowKeyExtractor(item)}>
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
                    <Text fontColor="light" typography="h5">
                      {'<'}
                    </Text>
                  </Button>
                  <Button>
                    <Text fontColor="light" typography="h5">
                      {'>'}
                    </Text>
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
