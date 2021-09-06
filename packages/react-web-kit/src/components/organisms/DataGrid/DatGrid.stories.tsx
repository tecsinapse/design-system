import React, { useState } from 'react';
import { Story } from '@storybook/react';
import {
  GroupButton,
  GroupButtonOption,
  GroupButtonValue,
  Icon,
} from '@tecsinapse/react-core';
import DataGrid from './DataGrid';
import { Input } from '../../atoms/Input';
import { Skeleton } from '../../atoms/Skeleton';
import { HeadersType } from './types';

export default {
  title: 'Components/Data Grid',
  component: DataGrid,
};

const options: GroupButtonValue<string>[] = [
  { value: 'Filter 1' },
  { value: 'Filter 2' },
];

const ToolbarFooterComponent = React.memo(() => {
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
});

const ToolbarRightComponent = React.memo(() => {
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
});

const SkeletonPlaceholder = React.memo(() => (
  <Skeleton height={55} radius="mili" animation="wave">
    <div style={{ width: '100%', minWidth: 650 }} />
  </Skeleton>
));

type ExampleData = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const fetchUsers = async (page = 0, rowsPerPage = 5) => {
  return await fetch(
    `https://jsonplaceholder.typicode.com/users?_start=${
      page * rowsPerPage
    }&_limit=${rowsPerPage}`,
    { method: 'GET' }
  );
};

const HEADERS: HeadersType<ExampleData>[] = [
  { label: 'ID', render: data => data.id },
  {
    label: 'Name',
    render: data => data.name,
    sort: direction => {
      alert(`sorting in: ${direction}`);
    },
  },
  { label: 'Username', render: data => data.username },
  { label: 'Email', render: data => data.email },
];

const Template: Story = args => {
  const [selected, setSelected] = React.useState<ExampleData[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<ExampleData[]>([]);

  React.useEffect(() => {
    fetchUsers(currentPage, rowsPerPage)
      .then(async data => {
        setTotalCount(parseInt(data.headers.get('X-Total-Count') ?? '0'));
        const json = await data.json();
        setData(json);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    fetchUsers(currentPage, rowsPerPage)
      .then(async data => {
        const json = await data.json();
        setData(json);
      })
      .finally(() => setLoading(false));
  }, [rowsPerPage, currentPage]);

  const rowsPerPageOptions = React.useMemo(() => [5, 25, 50], []);
  const rowKeyExtractor = React.useCallback(data => String(data.id), []);

  return (
    <DataGrid
      headers={HEADERS}
      data={data}
      rowKeyExtractor={rowKeyExtractor}
      toolbarTitle="Server Side"
      toolbarRightIcons={<ToolbarRightComponent />}
      toolbarFooter={<ToolbarFooterComponent />}
      selectedRows={selected}
      onSelectedRows={setSelected}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onRowsPerPageChange={setRowsPerPage}
      page={currentPage}
      onPageChange={setCurrentPage}
      loading={loading}
      rowsCount={totalCount}
      skeletonComponent={<SkeletonPlaceholder />}
      {...args}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  selectable: true,
  exportFunction: () => alert('Export handler'),
  pagination: true,
};

const fetchAllUsers = async () => {
  return await fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: 'GET',
  });
};

const TemplateClient: Story = args => {
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<ExampleData[]>([]);

  React.useEffect(() => {
    fetchAllUsers()
      .then(async data => {
        const json = await data.json();
        setData(json);
      })
      .finally(() => setLoading(false));
  }, []);

  const rowKeyExtractor = React.useCallback(data => String(data.id), []);
  const rowsPerPageOptions = React.useMemo(() => [5, 25, 50], []);

  return (
    <DataGrid
      headers={HEADERS}
      data={data}
      rowKeyExtractor={rowKeyExtractor}
      toolbarTitle="Client Side"
      toolbarRightIcons={<ToolbarRightComponent />}
      toolbarFooter={<ToolbarFooterComponent />}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onRowsPerPageChange={setRowsPerPage}
      page={currentPage}
      onPageChange={setCurrentPage}
      loading={loading}
      skeletonComponent={<SkeletonPlaceholder />}
      {...args}
    />
  );
};

export const ClientSide = TemplateClient.bind({});

ClientSide.args = {
  exportFunction: () => alert('Export handler'),
  pagination: true,
};
