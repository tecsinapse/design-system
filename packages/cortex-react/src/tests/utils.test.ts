import '@testing-library/jest-dom';
import { getNameInitials } from '../utils';

describe('GetNameInitials', () => {
  it('test getNameInitials single name', () => {
    const initials = getNameInitials('Usuario');

    expect(initials).toBe('U');
  });

  it('test getNameInitials full name', () => {
    const withoutMiddleName = getNameInitials('Usuario Teste');
    const withMiddleName = getNameInitials('Usuario Teste Junior');

    expect(withoutMiddleName).toBe('UT');
    expect(withMiddleName).toBe('UJ');
  });
});
