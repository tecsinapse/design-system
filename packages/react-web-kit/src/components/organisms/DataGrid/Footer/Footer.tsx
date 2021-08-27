import React from 'react';
import { Button, Icon, Select, Text } from '@tecsinapse/react-web-kit';
import { TFoot, Tr } from '../../../atoms/Table';
import {
  FooterContainer,
  FooterContainerEnd,
  FooterContainerStart,
  HoveredText,
  NavigationButton,
  PageButton,
  PagesContainer,
  SelectContainer,
  TdFooterStyled,
} from './styled';

interface DataGridFooterProps {
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  rowsPerPageLabel?: (value: number) => string;
  exportLabel?: string;
  exportFunction?: () => void;
  dataLenght: number;
  /** Total data elements */
  count: number;
}

const Footer: React.FC<DataGridFooterProps> = ({
  rowsPerPageOptions = [1, 25, 50],
  rowsPerPage: _rowsPerPage = 1,
  rowsPerPageLabel = value => `Exibir por página: ${value} itens`,
  exportFunction,
  exportLabel,
  dataLenght,
  count,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(_rowsPerPage);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const getPaginationSlice = (): { start: number; end: number } => {
    const totalPages = Math.ceil(dataLenght / rowsPerPage);
    if (totalPages < 4) {
      return { start: 0, end: totalPages };
    }
    if (currentPage === 0) {
      return { start: currentPage, end: currentPage + 3 };
    }
    if (currentPage === totalPages - 1) {
      return { start: currentPage - 2, end: currentPage + 1 };
    }
    return { start: currentPage - 1, end: currentPage + 2 };
  };

  return (
    <TFoot>
      <Tr>
        <TdFooterStyled colSpan={99}>
          <FooterContainer>
            <FooterContainerStart>
              <SelectContainer>
                <Select
                  options={rowsPerPageOptions}
                  onSelect={value => setRowsPerPage(value as number)}
                  value={rowsPerPage}
                  type={'single'}
                  keyExtractor={value => String(value)}
                  labelExtractor={rowsPerPageLabel}
                />
              </SelectContainer>
              {exportFunction && (
                <HoveredText>
                  <Button variant="outlined" onPress={() => exportFunction()}>
                    <Text fontColor="orange" fontWeight="bold">
                      {exportLabel}
                    </Text>
                  </Button>
                </HoveredText>
              )}
            </FooterContainerStart>
            <FooterContainerEnd>
              <NavigationButton
                onPress={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <Icon
                  name={'chevron-left'}
                  type={'material-community'}
                  fontColor={'light'}
                />
              </NavigationButton>
              <PagesContainer>
                {[...Array(Math.ceil(dataLenght / rowsPerPage)).keys()]
                  .slice(getPaginationSlice().start, getPaginationSlice().end)
                  .map(value => (
                    <HoveredText>
                      <PageButton
                        variant={currentPage === value ? 'outlined' : 'text'}
                        key={`page-${value}`}
                        onPress={() => setCurrentPage(value)}
                      >
                        <Text fontColor="medium" fontWeight="bold">
                          {value + 1}
                        </Text>
                      </PageButton>
                    </HoveredText>
                  ))}
              </PagesContainer>
              <NavigationButton
                onPress={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(dataLenght / rowsPerPage) - 1
                }
              >
                <Icon
                  name={'chevron-right'}
                  type={'material-community'}
                  fontColor={'light'}
                />
              </NavigationButton>
            </FooterContainerEnd>
          </FooterContainer>
        </TdFooterStyled>
      </Tr>
    </TFoot>
  );
};

export default Footer;
