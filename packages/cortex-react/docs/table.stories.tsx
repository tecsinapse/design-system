import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  Button,
  Hr,
  Table,
  TCell,
  Td,
  TFoot,
  THead,
  THeadCell,
  TRow,
} from '../index';

export default {
  title: 'Cortex/Table',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <Table>
      <THead>
        <TRow>
          <Td>
            <div
              className={
                'mb-centi mt-deca flex w-full flex-row items-center justify-between'
              }
            >
              <p className="text-h3">Example table</p>
            </div>
          </Td>
        </TRow>
        <TRow>
          {['col 1', 'col 2', 'col 3', 'col 5', 'col 6'].map(name => (
            <THeadCell>{name}</THeadCell>
          ))}
        </TRow>
        <TRow>
          <Td>
            <Hr />
          </Td>
        </TRow>
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
          <Td>
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
};

export const Base = {
  render: Template,
  args: {},
};
