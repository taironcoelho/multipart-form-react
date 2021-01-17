import {validateCPF, validatePassword} from '../../models/register';

describe('Models - Register - validateCPF', () => {
  it('should return invalid for CPF with less than 11 characters', () => {
    const cpf = '1112223334';
    const validation = validateCPF(cpf);
    expect(validation.isValid).toBeFalsy();
    expect(validation.message.length).not.toBe(0);
  });

  it('should return valid for CPF with 11 characters', () => {
    const cpf = '11122233345';
    const validation = validateCPF(cpf);
    expect(validation.isValid).toBeTruthy();
    expect(validation.message.length).toBe(0);
  });
});

describe('Models - Register - validatePassword', () => {
  it('should return invalid for password less than 4 characteres', () => {
    const password = '123';
    const confirmPassword = '123';
    const validation = validatePassword({password, confirmPassword});
    expect(validation.isValid).toBeFalsy();
    expect(validation.message.length).not.toBe(0);
  });

  it('should return invalid for password more than 20 characteres', () => {
    const password = '123456789012345678901';
    const confirmPassword = '123456789012345678901';
    const validation = validatePassword({password, confirmPassword});
    expect(validation.isValid).toBeFalsy();
    expect(validation.message.length).not.toBe(0);
  });

  it('should return invalid for password different than confirmPassword', () => {
    const password = '12345';
    const confirmPassword = '1235';
    const validation = validatePassword({password, confirmPassword});
    expect(validation.isValid).toBeFalsy();
    expect(validation.message.length).not.toBe(0);
  });

  it('should return valid for password between 4 and 20', () => {
    const password = '12345';
    const confirmPassword = '12345';
    const validation = validatePassword({password, confirmPassword});
    expect(validation.isValid).toBeTruthy();
    expect(validation.message.length).toBe(0);
  });
});
