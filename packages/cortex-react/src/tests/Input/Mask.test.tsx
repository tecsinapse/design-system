import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BRLMask, Input, Masks } from '../..';

// IMPORTANT: fireEvent.blur after fireEvent.change needed to apply mask

describe('InputMask', () => {
  describe('Expression', () => {
    it('Should apply correct expression mask on phone number masks', () => {
      render(<Input.Mask mask={Masks.COMBINED_PHONE} />);

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
      render(<Input.Mask mask={Masks.COMBINED_CPF_CNPJ} />);

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
      render(<Input.Mask mask={BRLMask} />);

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
      render(<Input.Mask mask={BRLMask} />);

      const maskCurrencyElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskCurrencyElement, {
        target: { value: 'teste' },
      });

      fireEvent.blur(maskCurrencyElement);

      expect(maskCurrencyElement.value).toBe('R$ 0,00');
    });
  });
});
