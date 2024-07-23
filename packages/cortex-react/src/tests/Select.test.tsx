import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Input, Select } from '../components';

type SelectOption = {
  id: string;
  name: string;
};

const mockOptions = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
];

const mockGroupedOptions = new Map();
mockGroupedOptions.set('Group 1', [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
]);
mockGroupedOptions.set('Group 2', [
  { id: '4', name: 'Option 4' },
  { id: '5', name: 'Option 5' },
  { id: '6', name: 'Option 6' },
]);

const mockedGroupedOptionsFlatten = Array.from(
  mockGroupedOptions.values()
).flatMap(value => value);

const keyExtractor = (option: SelectOption) => option.id;
const labelExtractor = (option: SelectOption) => option.name;

const groupedLabelExtractor = (value: string) => value;

describe('Select', () => {
  const onSelectMock = jest.fn();

  it('Should render with default label', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={jest.fn()} />
        </Select.Popover>
      </Select.Root>
    );

    const selectElement = screen.getByText('Select an option');

    expect(selectElement).toBeInTheDocument();
  });

  it('Should open and close popover on button click', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={jest.fn()} />
        </Select.Popover>
      </Select.Root>
    );

    const button = screen.getByRole('button', { name: /select an option/i });
    fireEvent.click(button);

    mockOptions.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });

    fireEvent.click(button);
    mockOptions.forEach(option => {
      expect(screen.queryByText(option.name)).not.toBeInTheDocument();
    });
  });

  it('Should render all options', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={jest.fn()} />
        </Select.Popover>
      </Select.Root>
    );

    const button = screen.getByRole('button', { name: /select an option/i });
    fireEvent.click(button);

    mockOptions.map(option =>
      expect(screen.getByText(option.name)).toBeInTheDocument()
    );
  });

  it('Should select an option and closes popover', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );

    fireEvent.click(screen.getByRole('button', { name: /select an option/i }));

    const popover = screen.getByRole('select');
    expect(popover).toBeVisible();

    fireEvent.click(screen.getByText('Option 1'));

    expect(onSelectMock).toHaveBeenCalledWith(mockOptions[0]);

    expect(popover).not.toBeVisible();
  });

  it('Should render selected option as placeholder', () => {
    render(
      <Select.Root
        value={mockOptions[0]}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );
    const selectPlaceholderElement = screen.getByTestId('select-placeholder');
    expect(selectPlaceholderElement).toHaveTextContent(mockOptions[0].name);
  });

  it('Should render with correct label multi select with one selected', () => {
    render(
      <Select.Root
        value={[mockOptions[0], mockOptions[2]]}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );
    const selectPlaceholderElement = screen.getByTestId('select-placeholder');
    expect(selectPlaceholderElement).toHaveTextContent('2 items selected');
  });

  it('Should render all grouped options correctly', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.GroupedOptions
            options={mockGroupedOptions}
            onSelect={onSelectMock}
            groupedLabelExtractor={groupedLabelExtractor}
          />
        </Select.Popover>
      </Select.Root>
    );

    fireEvent.click(screen.getByRole('button', { name: /select an option/i }));

    [...(mockGroupedOptions ?? [])].forEach(([key, value]) => {
      expect(screen.getByText(key)).toBeInTheDocument();
      value.forEach(option =>
        expect(screen.getByText(option.name)).toBeInTheDocument()
      );
    });
  });

  it('Should render component inside popover', () => {
    const placeholderText = 'Search input';
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Input.Search placeholder={placeholderText} />
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );

    fireEvent.click(screen.getByRole('button', { name: /select an option/i }));

    const searchInputElement = screen.getByPlaceholderText(placeholderText);
    expect(searchInputElement).toBeInTheDocument();
  });

  it('Should not close popover on Select.Popover click that is not an option', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <div data-testid={'popover-content'} />
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );

    const trigger = screen.getByRole('button', { name: /select an option/i });

    fireEvent.click(trigger);

    const popoverContent = screen.getByTestId('popover-content');

    fireEvent.click(popoverContent);

    expect(popoverContent).toBeInTheDocument();
  });

  it('Should render checkbox in all multi options select', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.MultiOptions options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);

    const checkBoxElements = screen.queryAllByRole('checkbox');

    expect(checkBoxElements.length).toBe(mockOptions.length);
  });

  it('Should render checkbox in all multi grouped options select', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.MultiGroupedOptions
            options={mockGroupedOptions}
            onSelect={onSelectMock}
            groupedLabelExtractor={groupedLabelExtractor}
          />
        </Select.Popover>
      </Select.Root>
    );

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);

    const checkBoxElements = screen.queryAllByRole('checkbox');

    expect(checkBoxElements.length).toBe(mockedGroupedOptionsFlatten.length);
  });

  // TODO: FIX TEST
  // it('Should check option by clicking at option', async () => {
  //   const [value, setValue] = useState<
  //     {
  //       id: string;
  //       name: string;
  //     }[]
  //   >([]);

  //   render(
  //     <Select.Root
  //       value={value}
  //       keyExtractor={keyExtractor}
  //       labelExtractor={labelExtractor}
  //     >
  //       <Select.Trigger label="Select an option" />
  //       <Select.Popover>
  //         <Select.MultiOptions
  //           options={mockOptions}
  //           onSelect={values => setValue(values)}
  //         />
  //       </Select.Popover>
  //     </Select.Root>
  //   );

  //   const trigger = screen.getByRole('button');

  //   fireEvent.click(trigger);

  //   const optionElements = screen.getAllByRole('option');

  //   fireEvent.click(optionElements[0]);
  //   fireEvent.click(optionElements[2]);

  //   const checkBoxElements = screen.getAllByRole(
  //     'checkbox'
  //   ) as HTMLInputElement[];

  //   expect(checkBoxElements[0]).toBeChecked();
  //   expect(checkBoxElements[1]).not.toBeChecked();
  //   expect(checkBoxElements[2]).toBeChecked();
  // });
});
