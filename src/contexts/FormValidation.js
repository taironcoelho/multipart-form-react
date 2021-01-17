import React from 'react';

const FormValidation = React.createContext({
  cpf: noValidation,
  password: noValidation,
});

function noValidation() {
  return {isValid: true, message: ''};
}

export default FormValidation;
