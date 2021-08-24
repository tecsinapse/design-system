import React, { useState } from 'react';
import { Story } from '@storybook/react';
import DataGrid from './DataGrid';
import { Input } from '../../atoms/Input';
import {
  GroupButton,
  GroupButtonOption,
  GroupButtonValue,
  Icon,
} from '@tecsinapse/react-core';

export default {
  title: 'Components/Data Grid',
  component: DataGrid,
};

const options: GroupButtonValue<string>[] = [
  { value: 'Filter 1' },
  { value: 'Filter 2' },
];

const ToolbarFooterComponent = () => {
  const [active, setActive] = useState<string>(options[0].value);
  return (
    <>
      <hr
        style={{
          height: 1,
          backgroundColor: '#C2BFBC',
          border: 0,
          opacity: 0.15,
          margin: 0,
        }}
      />
      <div style={{ padding: '12px 32px 6px' }}>
        <GroupButton
          value={active}
          options={options}
          renderKey={option => option}
          renderOption={(option, active) => (
            <GroupButtonOption active={active} description={option} />
          )}
          onChange={setActive}
        />
      </div>
    </>
  );
};

const ToolbarRightComponent = () => {
  return (
    <Input
      leftComponent={
        <div style={{ margin: '0 8px' }}>
          <Icon
            name={'magnify'}
            type={'material-community'}
            colorVariant="secondary"
          />
        </div>
      }
      placeholder="Search term"
      placeholderTextColor="#85807A"
    />
  );
};

type ExampleData = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const data: ExampleData[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
];

function removeElement<T>(arr: T[], index: number): T[] {
  arr.splice(index, 1);
  return arr;
}

const Template: Story = args => {
  const [selected, setSelected] = React.useState<ExampleData[]>([]);

  const headers = [
    { label: 'ID', render: data => data.id, sort: () => {} }, // TODO: Add support for sorting on dev side
    { label: 'Name', render: data => data.name },
    { label: 'Username', render: data => data.username },
    { label: 'Email', render: data => data.email },
  ];

  const rowKeyExtractor = data => String(data.id);

  const handleSelect = (current: ExampleData, checked: boolean) => {
    if (checked) {
      setSelected([...selected, current]);
      return;
    }
    const idx = selected.findIndex(
      el => rowKeyExtractor(el) === rowKeyExtractor(current)
    );
    setSelected([...removeElement(selected, idx)]);
  };

  return (
    <DataGrid
      headers={headers}
      data={data}
      rowKeyExtractor={rowKeyExtractor}
      toolbarTitle="Data grid"
      toolbarRightIcons={<ToolbarRightComponent />}
      toolbarFooter={<ToolbarFooterComponent />}
      selected={selected}
      setSelected={handleSelect}
      setSelectAll={() =>
        selected.length === data.length ? setSelected([]) : setSelected(data)
      }
      {...args}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  selectable: true,
};
