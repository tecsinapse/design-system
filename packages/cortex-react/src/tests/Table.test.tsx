import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  Button,
  Table,
  TCell,
  Td,
  TFoot,
  THead,
  THeadCell,
  TRow,
  TRowHeader,
} from '../components';

describe('Table', () => {
  it('Should Render Table', () => {
    render(
      <Table>
        <THead>
          <TRow>
            <Td colSpan={99}>
              <p className="text-h3">Title Table</p>
            </Td>
          </TRow>
          <TRowHeader>
            {['col 1', 'col 2', 'col 3', 'col 5', 'col 6'].map(name => (
              <THeadCell key={name}>{name}</THeadCell>
            ))}
          </TRowHeader>
        </THead>
        <tbody>
          {['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6'].map(row => (
            <TRow key={row}>
              <>
                {['cell 1', 'cell 2', 'cell 3', 'cell 4', 'cell 5'].map(
                  cell => (
                    <TCell key={cell}>{cell}</TCell>
                  )
                )}
              </>
            </TRow>
          ))}
        </tbody>
        <TFoot>
          <TRow>
            <Td colSpan={99}>
              <div className={'mt-centi flex justify-between'}>
                <Button>
                  <p>Button</p>
                </Button>
                <Button>
                  <p>Button</p>
                </Button>
              </div>
            </Td>
          </TRow>
        </TFoot>
      </Table>
    );
    const table = screen.getByTestId('table');
    const thead = screen.getByTestId('thead');
    const tRowHeader = screen.getByTestId('trow-header');
    const tfoot = screen.getByTestId('tfoot');
    const listTHeadCell = screen.getAllByTestId('thead-cell');
    const listTRow = screen.getAllByTestId('trow');
    const listTCell = screen.getAllByTestId('tcell');
    const listTd = screen.getAllByTestId('td');

    expect(table).toBeInTheDocument();
    expect(thead).toBeInTheDocument();
    expect(tRowHeader).toBeInTheDocument();
    expect(tfoot).toBeInTheDocument();
    listTHeadCell.forEach(theadCell => expect(theadCell).toBeInTheDocument());
    listTRow.forEach(row => expect(row).toBeInTheDocument());
    listTCell.forEach(tcell => expect(tcell).toBeInTheDocument());
    listTd.forEach(_td => expect(_td).toBeInTheDocument());
  });
});
