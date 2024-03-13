import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  button,
  hr,
  tCell,
  tFoot,
  tHead,
  tHeadCell,
  tRoot,
  tRow,
} from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Table',
  component: <table />,
};

const Template: StoryFn = () => {
  return (
    <table className={tRoot({ className: 'min-w-full' })}>
      <thead className={tHead()}>
        <tr className={tRow({ className: '' })}>
          <th colSpan={99}>
            <div
              className={
                'mb-centi flex w-full flex-row items-center justify-between'
              }
            >
              <p className="text-h3">Titulo tabela</p>
            </div>
          </th>
        </tr>
        <tr className={tRow()}>
          {['col 1', 'col 2', 'col 3', 'col 5', 'col 6'].map(name => (
            <th className={tHeadCell()}>{name}</th>
          ))}
        </tr>
        <tr className={tRow()}>
          <td colSpan={99}>
            <hr className={hr()} />
          </td>
        </tr>
      </thead>
      <tbody>
        {['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6'].map(() => (
          <tr className={tRow()}>
            <>
              {['cell 1', 'cell 2', 'cell 3', 'cell 4', 'cell 5'].map(cell => (
                <td className={tCell()}>{cell}</td>
              ))}
            </>
          </tr>
        ))}
      </tbody>
      <tfoot className={tFoot()}>
        <tr className={tRow()}>
          <td colSpan={99}>
            <div className={'mt-centi flex justify-between'}>
              <button className={button({ intent: 'primary' })}>Botão</button>
              <button className={button({ intent: 'primary' })}>Botão</button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export const Base = Template.bind({});

Base.args = {};
