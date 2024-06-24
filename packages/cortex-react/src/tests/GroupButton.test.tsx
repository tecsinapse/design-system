import React from 'react';
import '@testing-library/jest-dom';
import { GroupButton, GroupButtonProps, GroupButtonValue } from '../components';
import { fireEvent, render, screen } from '@testing-library/react';

const options: GroupButtonValue<string>[] = [
  {
    value: 'Sim',
  },
  { value: 'Talvez' },
  { value: 'Não' },
];

const props: GroupButtonProps<string> = {
  onChange: jest.fn(),
  value: options[0].value,
  options,
  renderOption: op => op,
  renderKey: op => String(op),
};

describe('GroupButton', () => {
  it('Render GroupButton', () => {
    const { getByTestId } = render(<GroupButton {...props} />);
    const container = getByTestId('group-button-container');
    expect(container).toBeInTheDocument();
  });

  it('Render all options', () => {
    render(<GroupButton {...props} />);
    options.forEach(option =>
      expect(screen.getByText(option.value)).toBeInTheDocument()
    );
  });

  it('Should call onChange when an option is clicked', () => {
    render(<GroupButton {...props} />);
    const option = options[2];
    fireEvent.click(screen.getByText(option.value));
    expect(props.onChange).toHaveBeenCalledWith(option.value);
  });

  it('Should apply active style to the selected option', () => {
    render(
      <GroupButton {...props} customStyles={{ active: 'bg-success-medium' }} />
    );
    const activeOption = screen.getByText(options[0].value);
    expect(activeOption).toHaveClass('bg-success-medium');
  });

  it('Should apply inactive style to the unselected option', () => {
    render(
      <GroupButton
        {...props}
        customStyles={{ inactive: 'bg-primary-medium' }}
      />
    );
    const unselectedOption1 = screen.getByText(options[1].value);
    const unselectedOption2 = screen.getByText(options[2].value);
    expect(unselectedOption1).toHaveClass('bg-primary-medium');
    expect(unselectedOption2).toHaveClass('bg-primary-medium');
  });

  it('Should apply style in first option', () => {
    render(
      <GroupButton
        {...props}
        customStyles={{ firstButton: 'first:bg-primary-medium' }}
      />
    );
    const firstOption = screen.getByText(options[0].value);
    expect(firstOption).toHaveClass('first:bg-primary-medium');
  });

  it('Should apply style in last option', () => {
    render(
      <GroupButton
        {...props}
        customStyles={{ firstButton: 'last:bg-error-medium' }}
      />
    );
    const firstOption = screen.getByText(options[0].value);
    expect(firstOption).toHaveClass('last:bg-error-medium');
  });

  it('Should disable all options when disableAllOptions is true', () => {
    render(<GroupButton {...props} disableAllOptions />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
