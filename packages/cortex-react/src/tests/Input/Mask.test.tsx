import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CurrencyIMask, ExpressionMasks, Input, NumberIMask } from '../..';

// IMPORTANT: fireEvent.blur after fireEvent.change needed to apply mask

describe('InputMask', () => {
  describe('Expression', () => {
    it('Should apply correct expression mask on phone number masks', () => {
      const maskOptions = {
        mask: [ExpressionMasks.PHONE, ExpressionMasks.PHONE_EXTENDED],
      };

      render(<Input.Mask mask={maskOptions} />);

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
        mask: [ExpressionMasks.CPF, ExpressionMasks.CNPJ],
      };

      render(<Input.Mask mask={maskOptions} />);

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
      render(<Input.Mask mask={NumberIMask} />);

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
      render(<Input.Mask mask={NumberIMask} />);

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
      render(<Input.Mask mask={CurrencyIMask} />);

      const maskCurrencyElement = screen.getByTestId(
        'input-box'
      ) as HTMLInputElement;

      fireEvent.change(maskCurrencyElement, {
        target: { value: '92,60' },
      });

      fireEvent.blur(maskCurrencyElement);

      expect(maskCurrencyElement.value).toBe('R$ 92,6');
    });

    it('Should not render text on currency mask', () => {
      render(<Input.Mask mask={CurrencyIMask} />);

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
