import { useCallback, useEffect, useRef } from 'react';

type PhoneValueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => string;

export const usePhoneInputChange = (
  inputValue: string,
  handlePhoneValueChange: PhoneValueChangeHandler
) => {
  const previousInputValueRef = useRef(inputValue);

  useEffect(() => {
    previousInputValueRef.current = inputValue;
  }, [inputValue]);

  return useCallback(
    (value: string) => {
      const previousValue = previousInputValueRef.current;
      const isDeletion = value.length < previousValue.length;
      const isInsertion = value.length > previousValue.length;

      let inputType = 'insertText';
      let data: string | null = null;

      if (isDeletion) {
        inputType = 'deleteContentBackward';
      } else if (isInsertion) {
        data = value.slice(previousValue.length) || value[value.length - 1] || null;
      }

      previousInputValueRef.current = value;

      handlePhoneValueChange({
        target: { value, selectionStart: value.length },
        preventDefault: () => undefined,
        nativeEvent: { inputType, data },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    },
    [handlePhoneValueChange]
  );
};
