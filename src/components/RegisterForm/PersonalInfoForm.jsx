import React, {useState, useContext} from 'react';
import {TextField, Button, Switch, FormControlLabel} from '@material-ui/core';
import FormValidation from '../../contexts/FormValidation';
import useError from '../../hooks/useError';

function PersonalInfoForm({onSubmit}) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [cpf, setCpf] = useState('');
  const [offers, setOffers] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const validation = useContext(FormValidation);
  const [error, validateField, allowSubmit] = useError(validation);

  function _onSubmit(event) {
    event.preventDefault();
    if (allowSubmit()) {
      onSubmit({name, lastname, cpf, newsletter, offers});
    }
  }

  return (
    <form id="personal-info-form" onSubmit={_onSubmit}>
      <TextField
        value={name}
        onChange={event => {
          setName(event.target.value);
        }}
        id="name"
        label="Name"
        name="name"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        value={lastname}
        onChange={event => {
          setLastname(event.target.value);
        }}
        id="lastname"
        name="lastname"
        label="Lastname"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        value={cpf}
        onChange={event => {
          setCpf(event.target.value);
        }}
        onBlur={e => validateField('cpf', e.target.value)}
        error={!error.cpf.isValid}
        helperText={error.cpf.message}
        id="cpf"
        name="cpf"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <FormControlLabel
        label="Offers"
        control={
          <Switch
            id="offers"
            checked={offers}
            onChange={event => {
              setOffers(event.target.checked);
            }}
            name="offers"
            color="primary"
          />
        }
      />

      <FormControlLabel
        label="Newsletter"
        control={
          <Switch
            id="newsletter"
            checked={newsletter}
            onChange={event => {
              setNewsletter(event.target.checked);
            }}
            name="newsletter"
            color="primary"
          />
        }
      />

      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
    </form>
  );
}

export default PersonalInfoForm;
