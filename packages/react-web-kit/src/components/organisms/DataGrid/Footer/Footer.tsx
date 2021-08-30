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
  rowsPerPage: number;
  onRowsPerPageChange?: (value: number) => void;
  rowsPerPageOptions: number[];
  rowsPerPageLabel: (value: number) => string;
  exportLabel?: string;
  exportFunction?: () => void;
  /** Total data elements */
  rowsCount: number;
  page: number;
  onPageChange?: (page: number) => void;
  pagination: boolean;
}

const Footer: React.FC<DataGridFooterProps> = ({
  rowsPerPage,
  onRowsPerPageChange,
  rowsPerPageOptions,
  rowsPerPageLabel,
  exportFunction,
  exportLabel,
  rowsCount,
  page,
  onPageChange,
  pagination,
}) => {
  if (pagination && (!onPageChange || !onRowsPerPageChange)) {
    throw new Error(
      '[DataGrid] You should specify pagination handlers (onPageChange, onRowsPerPageChange)'
    );
  }

  const getPaginationSlice = (): { start: number; end: number } => {
    const totalPages = Math.ceil(rowsCount / rowsPerPage);
    if (totalPages < 4) {
      return { start: 0, end: totalPages };
    }
    if (page === 0) {
      return { start: page, end: page + 3 };
    }
    if (page === totalPages - 1) {
      return { start: page - 2, end: page + 1 };
    }
    return { start: page - 1, end: page + 2 };
  };

  return (
    <TFoot>
      <Tr>
        <TdFooterStyled colSpan={99}>
          <FooterContainer>
            <FooterContainerStart>
              {pagination && (
                <SelectContainer>
                  <Select
                    options={rowsPerPageOptions}
                    onSelect={value => onRowsPerPageChange?.(value as number)}
                    value={rowsPerPage}
                    type={'single'}
                    keyExtractor={value => String(value)}
                    labelExtractor={rowsPerPageLabel}
                  />
                </SelectContainer>
              )}
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
            {pagination && (
              <FooterContainerEnd>
                <NavigationButton
                  onPress={() => onPageChange?.(page - 1)}
                  disabled={page === 0}
                >
                  <Icon
                    name={'chevron-left'}
                    type={'material-community'}
                    fontColor={'light'}
                  />
                </NavigationButton>
                <PagesContainer>
                  {[...Array(Math.ceil(rowsCount / rowsPerPage)).keys()]
                    .slice(getPaginationSlice().start, getPaginationSlice().end)
                    .map(value => (
                      <HoveredText key={`page-${value}`}>
                        <PageButton
                          variant={page === value ? 'outlined' : 'text'}
                          onPress={() => onPageChange?.(value)}
                        >
                          <Text fontColor="medium" fontWeight="bold">
                            {value + 1}
                          </Text>
                        </PageButton>
                      </HoveredText>
                    ))}
                </PagesContainer>
                <NavigationButton
                  onPress={() => onPageChange?.(page + 1)}
                  disabled={page === Math.ceil(rowsCount / rowsPerPage) - 1}
                >
                  <Icon
                    name={'chevron-right'}
                    type={'material-community'}
                    fontColor={'light'}
                  />
                </NavigationButton>
              </FooterContainerEnd>
            )}
          </FooterContainer>
        </TdFooterStyled>
      </Tr>
    </TFoot>
  );
};

export default Footer;
