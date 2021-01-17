import React, {useState, useContext} from 'react';
import {TextField, Button} from '@material-ui/core';
import FormValidation from '../../contexts/FormValidation';
import useError from '../../hooks/useError';

function LoginForm({onSubmit}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validation = useContext(FormValidation);
  const [error, validateFields, allowSubmit] = useError(validation);

  function _onSubmit(event) {
    event.preventDefault();
    if (allowSubmit()) {
      onSubmit({email, password});
    }
  }

  return (
    <form id="login-form" onSubmit={_onSubmit}>
      <TextField
        value={email}
        onChange={event => {
          setEmail(event.target.value);
        }}
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        value={password}
        onChange={event => {
          setPassword(event.target.value);
        }}
        onBlur={e =>
          validateFields('password', {
            password: e.target.value,
            confirmPassword: confirmPassword,
          })
        }
        error={!error.password.isValid}
        helperText={error.password.message}
        id="password"
        name="password"
        label="Password"
        type="password"
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        value={confirmPassword}
        onChange={event => {
          setConfirmPassword(event.target.value);
        }}
        onBlur={e =>
          validateFields('password', {
            password: password,
            confirmPassword: e.target.value,
          })
        }
        error={!error.password.isValid}
        helperText={error.password.message}
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
    </form>
  );
}

export default LoginForm;
