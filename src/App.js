import React from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';
import {Container, Typography} from '@material-ui/core';
import FormValidation from './contexts/FormValidation';
import {validateCPF, validatePassword} from './models/register';
import './App.css';
import 'fontsource-roboto';

function App() {
  return (
    <Container component="article" maxWidth="sm">
      <Typography variant="h3" component="h1" align="center">
        Register form
      </Typography>
      <FormValidation.Provider
        value={{cpf: validateCPF, password: validatePassword}}
      >
        <RegisterForm onSubmit={onFormSubmit} />
      </FormValidation.Provider>
    </Container>
  );
}

function onFormSubmit(data) {
  console.log(data);
}

export default App;
