import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Input, Select } from '../components';
import { SelectMultiCheckAllOptions } from '../components/Select/MultiCheckAllOptions';
import {
  SelectContext,
  SelectMultiOptionsContext,
} from '../components/Select/context';

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

const fetchOptions: () => Promise<SelectOption[]> = () =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(mockOptions), 2000);
    } catch (e) {
      reject([]);
    }
  });

describe('Select', () => {
  let onSelectMock;

  beforeEach(() => {
    onSelectMock = jest.fn();
  });

  describe('Options', () => {
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

    it('Should render custom placeholder', () => {
      render(
        <Select.Root
          value={undefined}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
        >
          <Select.Trigger label="Select an option" placeholder="Placeholder" />
        </Select.Root>
      );

      const placeholderElement = screen.getByText('Placeholder');

      expect(placeholderElement).toBeInTheDocument();
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

      fireEvent.click(
        screen.getByRole('button', { name: /select an option/i })
      );

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

      fireEvent.click(
        screen.getByRole('button', { name: /select an option/i })
      );

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
  });

  describe('GroupedOptions', () => {
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

      fireEvent.click(
        screen.getByRole('button', { name: /select an option/i })
      );

      [...(mockGroupedOptions ?? [])].forEach(([key, value]) => {
        expect(screen.getByText(key)).toBeInTheDocument();
        value.forEach(option =>
          expect(screen.getByText(option.name)).toBeInTheDocument()
        );
      });
    });
  });

  describe('MultiOptions', () => {
    it('Should render checkbox in all multi options select', () => {
      render(
        <Select.Root
          value={undefined}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
        >
          <Select.Trigger label="Select an option" />
          <Select.Popover>
            <Select.MultiOptions
              options={mockOptions}
              onSelect={onSelectMock}
            />
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

    it('Should render MultiCheckAllOptions correctly', () => {
      render(
        <SelectContext.Provider
          value={{ keyExtractor, labelExtractor, value: [] }}
        >
          <SelectMultiOptionsContext.Provider
            value={{ options: mockOptions, onSelect: onSelectMock }}
          >
            <SelectMultiCheckAllOptions />
          </SelectMultiOptionsContext.Provider>
        </SelectContext.Provider>
      );

      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Select all');

      expect(checkbox).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it('Should call onChange with all options when select all', () => {
      render(
        <SelectContext.Provider
          value={{ keyExtractor, labelExtractor, value: [] }}
        >
          <SelectMultiOptionsContext.Provider
            value={{ options: mockOptions, onSelect: onSelectMock }}
          >
            <SelectMultiCheckAllOptions />
          </SelectMultiOptionsContext.Provider>
        </SelectContext.Provider>
      );

      const checkbox = screen.getByRole('checkbox');

      fireEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledWith(mockOptions);
    });

    it('Should call onChange with empty array when unselect all', () => {
      render(
        <SelectContext.Provider
          value={{ keyExtractor, labelExtractor, value: mockOptions }}
        >
          <SelectMultiOptionsContext.Provider
            value={{ options: mockOptions, onSelect: onSelectMock }}
          >
            <SelectMultiCheckAllOptions />
          </SelectMultiOptionsContext.Provider>
        </SelectContext.Provider>
      );

      const checkbox = screen.getByRole('checkbox');

      fireEvent.click(checkbox);

      expect(onSelectMock).toHaveBeenCalledWith([]);
    });
  });

  describe('Lazy', () => {
    it('Should render skeleton while loading lazy options', () => {
      render(
        <Select.Root
          value={undefined}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
        >
          <Select.Trigger label="Select an option" />
          <Select.Popover>
            <Select.Options options={fetchOptions} onSelect={onSelectMock} />
          </Select.Popover>
        </Select.Root>
      );
      const trigger = screen.getByRole('button');

      fireEvent.click(trigger);

      const skeletonElements = screen.queryAllByTestId('skeleton');

      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('Should render lazy options after fetch is finished', () => {
      render(
        <Select.Root
          value={undefined}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
        >
          <Select.Trigger label="Select an option" />
          <Select.Popover>
            <Select.Options options={fetchOptions} onSelect={onSelectMock} />
          </Select.Popover>
        </Select.Root>
      );

      const trigger = screen.getByRole('button');

      fireEvent.click(trigger);

      waitFor(() => {
        mockOptions.forEach(option => {
          expect(screen.queryByText(option.name)).toBeInTheDocument();
        });
      });
    });

    it('Should render custom option with prefixed text label', () => {
      render(
        <Select.Root
          value={undefined}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
        >
          <Select.Trigger label="Select an option" />
          <Select.Popover>
            <Select.Options>
              {mockOptions.map(option => (
                <Select.CustomOption
                  onSelectOption={onSelectMock}
                  option={option}
                  key={option.id}
                >
                  <p>Custom: {option.name}</p>
                </Select.CustomOption>
              ))}
            </Select.Options>
          </Select.Popover>
        </Select.Root>
      );

      // Abre o Popover
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // Verifica se as opções possuem o texto prefixado "Custom: "
      const customOptionOne = screen.getByText('Custom: Option 1');
      const customOptionTwo = screen.getByText('Custom: Option 2');
      const customOptionThree = screen.getByText('Custom: Option 3');

      expect(customOptionOne).toBeInTheDocument();
      expect(customOptionTwo).toBeInTheDocument();
      expect(customOptionThree).toBeInTheDocument();
    });
    it('Should render custom option with prefixed text label', () => {
      render(
        <Select.Root
          value={undefined}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
        >
          <Select.Trigger label="Select an option" />
          <Select.Popover>
            <Select.MultiOptions>
              {mockOptions.map(option => (
                <Select.CustomMultiOption
                  onSelect={onSelectMock}
                  option={option}
                  key={option.id}
                >
                  <p>Custom multi: {option.name}</p>
                </Select.CustomMultiOption>
              ))}
            </Select.MultiOptions>
          </Select.Popover>
        </Select.Root>
      );

      // Abre o Popover
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // Verifica se as opções possuem o texto prefixado "Custom: "
      const customOptionOne = screen.getByText('Custom multi: Option 1');
      const customOptionTwo = screen.getByText('Custom multi: Option 2');
      const customOptionThree = screen.getByText('Custom multi: Option 3');

      expect(customOptionOne).toBeInTheDocument();
      expect(customOptionTwo).toBeInTheDocument();
      expect(customOptionThree).toBeInTheDocument();

      const checkBoxElements = screen.queryAllByRole('checkbox');
      expect(checkBoxElements.length).toBe(mockOptions.length);
    });
  });
});
