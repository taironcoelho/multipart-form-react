import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormValidation from '../../contexts/FormValidation';

function renderWithProvider(ui, {validation, ...options} = {}) {
  function Wrapper(props) {
    return <FormValidation.Provider value={validation} {...props} />;
  }

  return render(ui, {wrapper: Wrapper, ...options});
}

function changeInputValueEvent(input, value) {
  fireEvent.change(input, {
    target: {
      value: value,
    },
  });
}

function expectSelectorToBeTruthy(container, selector) {
  const elem = container.querySelector(selector);
  expect(elem).toBeTruthy();
}

function expectSelectorToBeEmpty(container, selector) {
  const elem = container.querySelector(selector);
  expect(elem).toBeEmptyDOMElement();
}

function getFormsElements(container) {
  const loginForm = container.querySelector('form[id=login-form]');
  const personalInfoForm = container.querySelector(
    'form[id=personal-info-form]',
  );
  const deliveryForm = container.querySelector('form[id=delivery-form]');
  return {loginForm, personalInfoForm, deliveryForm};
}

function submitFormByClickingInSubmitButton(container) {
  const button = container.querySelector('button[type="submit"]');
  button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
}

export * from '@testing-library/react';

export {
  renderWithProvider,
  changeInputValueEvent,
  expectSelectorToBeTruthy,
  expectSelectorToBeEmpty,
  getFormsElements,
  submitFormByClickingInSubmitButton,
};
