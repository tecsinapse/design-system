import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../..';

// IMPORTANT: fireEvent.blur after fireEvent.change needed to apply mask

describe('InputMask', () => {
  describe('Expression', () => {
    it('Should apply correct expression mask on phone number masks', () => {
      const maskOptions = {
        mask: ['(00) 0000-0000', '(00) 00000-0000'],
      };

      render(<Input.MaskExpression mask={maskOptions.mask} />);

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
      const maskOptions = {
        mask: ['000.000.000-00', '00.000.000/0000-00'],
      };

      render(<Input.MaskExpression mask={maskOptions.mask} />);

      const maskExpressionElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskExpressionElement, {
        target: { value: '12345678910' },
      });

      fireEvent.blur(maskExpressionElement);

      expect(maskExpressionElement.value).toBe('123.456.789-10');

      fireEvent.change(maskExpressionElement, {
        target: { value: '12345678100001' },
      });

      fireEvent.blur(maskExpressionElement);

      expect(maskExpressionElement.value).toBe('12.345.678/1000-01');
    });
  });

  describe('Number', () => {
    it('Should not render text on number mask', () => {
      render(<Input.MaskNumber />);

      const maskNumberElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskNumberElement, {
        target: { value: 'teste... .' },
      });

      fireEvent.blur(maskNumberElement);

      expect(maskNumberElement.value).toBe('');
    });

    it('Should apply number mask correctly', () => {
      render(<Input.MaskNumber />);

      const maskNumberElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskNumberElement, {
        target: { value: '123456' },
      });

      fireEvent.blur(maskNumberElement);

      expect(maskNumberElement.value).toBe('123456');
    });
  });

  describe('Currency', () => {
    it('Should apply currency mask', () => {
      render(<Input.MaskCurrency />);

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
      render(<Input.MaskCurrency />);

      const maskCurrencyElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskCurrencyElement, {
        target: { value: 'teste' },
      });

      fireEvent.blur(maskCurrencyElement);

      expect(maskCurrencyElement.value).toBe('R$ ');
    });
  });
});
