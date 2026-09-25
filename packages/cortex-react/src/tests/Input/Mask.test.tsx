import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BRLMask, Input, Masks, PercentageMask } from '../..';

// IMPORTANT: fireEvent.blur after fireEvent.change needed to apply mask

describe('InputMask', () => {
  describe('Expression', () => {
    it('Should apply correct expression mask on phone number masks', () => {
      render(
        <Input.Mask mask={Masks.COMBINED_PHONE} data-testid="input-box" />
      );

      const maskExpressionElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskExpressionElement, {
        target: { value: '1112345678' },
      });

      fireEvent.blur(maskExpressionElement);

      expect(maskExpressionElement.value).toBe('(11) 1234-5678');

      fireEvent.change(maskExpressionElement, {
        target: { value: '11123456789' },
      });

      fireEvent.blur(maskExpressionElement);

      expect(maskExpressionElement.value).toBe('(11) 12345-6789');
    });

    it('Should apply correct expression mask on cpf/cnpj masks', () => {
      render(
        <Input.Mask mask={Masks.COMBINED_CPF_CNPJ} data-testid="input-box" />
      );

      const maskExpressionElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskExpressionElement, {
        target: { value: '12345678910' },
      });

      fireEvent.blur(maskExpressionElement);

      expect(maskExpressionElement.value).toBe('123.456.789-10');
    });
  });

  describe('Currency', () => {
    it('Should apply currency mask', () => {
      render(<Input.Mask mask={BRLMask} data-testid="input-box" />);

      const maskCurrencyElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskCurrencyElement, {
        target: { value: '92,60' },
      });

      fireEvent.blur(maskCurrencyElement);

      expect(maskCurrencyElement.value).toBe('R$ 92,60');
    });
    it('Should not render text on currency mask', () => {
      render(<Input.Mask mask={BRLMask} data-testid="input-box" />);

      const maskCurrencyElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskCurrencyElement, {
        target: { value: 'teste' },
      });

      fireEvent.blur(maskCurrencyElement);

      expect(maskCurrencyElement.value).toBe('R$ 0,00');
    });

    it('Should keep the coupled percentage numeric after a formatted currency edit', () => {
      const ControlledMasks = () => {
        const total = 540;
        const [currency, setCurrency] = React.useState(0);
        const [percentage, setPercentage] = React.useState(0);

        const handleChangeCurrency = (value: number) => {
          setCurrency(value);
          setPercentage(value === 0 ? 0 : (value * 100) / total);
        };

        return (
          <>
            <Input.Mask
              data-testid="currency-input"
              mask={BRLMask}
              value={currency}
              onChange={handleChangeCurrency}
            />
            <Input.Mask
              data-testid="percentage-input"
              mask={PercentageMask}
              value={percentage}
              onChange={setPercentage}
            />
          </>
        );
      };

      render(<ControlledMasks />);

      const currencyInput = screen.getByTestId(
        'currency-input'
      ) as HTMLInputElement;
      const percentageInput = screen.getByTestId(
        'percentage-input'
      ) as HTMLInputElement;

      fireEvent.change(currencyInput, { target: { value: 'R$ 92,60' } });

      expect(currencyInput.value).toBe('R$ 92,60');
      expect(percentageInput.value).toBe('17,15');
    });
  });
});