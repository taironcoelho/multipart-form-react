function validateCPF(cpf) {
  if (cpf.length !== 11) {
    return {isValid: false, message: 'CPF must have 11 digits'};
  } else {
    return {isValid: true, message: ''};
  }
}

function validatePassword({password, confirmPassword}) {
  if (password.length < 4 || password.length > 20) {
    return {
      isValid: false,
      message: 'Password must have between 4 and 20 characters',
    };
  } else {
    return _checkPasswordConfirmation(password, confirmPassword);
  }
}

function _checkPasswordConfirmation(password, confirmPassword) {
  if (password !== confirmPassword && confirmPassword.length !== 0) {
    return {
      isValid: false,
      message: 'Password didn`t match',
    };
  } else {
    return _successValidation();
  }
}

function _successValidation() {
  return {isValid: true, message: ''};
}

export {validateCPF, validatePassword};
