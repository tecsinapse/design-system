import '@testing-library/jest-dom';
import { getNameInitials } from '../components/utils';

test('test getNameInitials single name', () => {
  const initials = getNameInitials('Usuario');

  expect(initials).toBe('U');
});

test('test getNameInitials full name', () => {
  const withoutMiddleName = getNameInitials('Usuario Teste');
  const withMiddleName = getNameInitials('Usuario Teste Junior');

  expect(withoutMiddleName).toBe('UT');
  expect(withMiddleName).toBe('UJ');
});

test('test getNameInitials empty name', () => {
  expect(getNameInitials('')).toBe(undefined);
});
