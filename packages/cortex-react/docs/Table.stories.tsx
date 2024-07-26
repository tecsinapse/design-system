import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  TCell,
  TFoot,
  THead,
  THeadCell,
  TRow,
  TRowHeader,
  Table,
  Td,
} from '../src';

export default {
  title: 'Cortex/Table',
  component: Table,
  subcomponents: { THead, THeadCell, TRowHeader, TRow, Td, TCell, TFoot },
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  render: () => (
    <Table>
      <THead>
        <TRow>
          <Td colSpan={99}>
            <div
              className={
                'mb-centi mt-deca flex w-full flex-row items-center justify-between'
              }
            >
              <p className="text-h3">Example table</p>
            </div>
          </Td>
        </TRow>
        <TRowHeader>
          {['col 1', 'col 2', 'col 3', 'col 5', 'col 6'].map(name => (
            <THeadCell>{name}</THeadCell>
          ))}
        </TRowHeader>
      </THead>
      <tbody>
        {['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6'].map(() => (
          <TRow>
            <>
              {['cell 1', 'cell 2', 'cell 3', 'cell 4', 'cell 5'].map(cell => (
                <TCell>{cell}</TCell>
              ))}
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
  ),
};
