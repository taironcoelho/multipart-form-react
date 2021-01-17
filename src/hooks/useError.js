import {useState} from 'react';

function useError(validation) {
  const initialState = createInitialState(validation);
  const [error, setError] = useState(initialState);

  function validateFields(field, value) {
    const newState = {...error};
    newState[field] = validation[field](value);
    setError(newState);
  }

  function allowSubmit() {
    for (let field in error) {
      if (!error[field].isValid) {
        return false;
      }
    }
    return true;
  }

  return [error, validateFields, allowSubmit];
}

function createInitialState(validation) {
  const initialState = {};
  for (let field in validation) {
    initialState[field] = {isValid: true, message: ''};
  }

  return initialState;
}

export default useError;
