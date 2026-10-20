import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { Autocomplete } from '../components';
import { Option } from '../components/Autocomplete/types';

const AutocompleteHarness = ({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) => {
  const [value, setValue] = useState('');

  return (
    <Autocomplete.Root
      keyExtractor={(op: Option) => op.value}
      labelExtractor={(op: Option) => op.label}
      onOpenChange={onOpenChange}
    >
      <Autocomplete.Trigger
        inputValue={value}
        onChange={event => setValue(event.target.value)}
      />
      <Autocomplete.Popover>
        <Autocomplete.Options options={[]} />
      </Autocomplete.Popover>
    </Autocomplete.Root>
  );
};

describe('Autocomplete onOpenChange', () => {
  it('does not call onOpenChange on mount', () => {
    const onOpenChange = vi.fn();
    render(<AutocompleteHarness onOpenChange={onOpenChange} />);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('calls onOpenChange(true) when the popover opens and onOpenChange(false) when it closes', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<AutocompleteHarness onOpenChange={onOpenChange} />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'a');
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    await user.clear(input);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('does not re-fire when an inline onOpenChange callback changes identity across renders', async () => {
    const calls: boolean[] = [];
    const Wrapper = () => {
      const [, forceRender] = useState(0);
      return (
        <>
          <button onClick={() => forceRender(n => n + 1)}>rerender</button>
          <AutocompleteHarness onOpenChange={open => calls.push(open)} />
        </>
      );
    };

    const user = userEvent.setup();
    render(<Wrapper />);

    await user.click(screen.getByText('rerender'));
    await user.click(screen.getByText('rerender'));

    expect(calls).toHaveLength(0);
  });

  it('does not call onOpenChange on mount under React.StrictMode double-invoked effects', () => {
    const onOpenChange = vi.fn();
    render(
      <React.StrictMode>
        <AutocompleteHarness onOpenChange={onOpenChange} />
      </React.StrictMode>
    );

    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
