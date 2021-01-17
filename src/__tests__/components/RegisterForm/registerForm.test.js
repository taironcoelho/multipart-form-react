import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RegisterForm from '../../../components/RegisterForm/RegisterForm';
import {
  submitFormByClickingInSubmitButton,
  getFormsElements,
  render,
  cleanup,
} from '../../utils/test-utils';

describe('Components - Register Form', () => {
  afterEach(cleanup);

  it('should has a Login step', () => {
    const {getByText} = render(<RegisterForm />);
    expect(getByText(/Login/)).toBeInTheDocument();
  });

  it('should render only LoginForm as the first step', () => {
    const {container} = render(<RegisterForm />);
    const {loginForm, personalInfoForm, deliveryForm} = getFormsElements(
      container,
    );

    expect(loginForm).toBeInTheDocument();
    expect(personalInfoForm).not.toBeInTheDocument();
    expect(deliveryForm).not.toBeInTheDocument();
  });

  it('should has a Personal Info step', () => {
    const {getByText} = render(<RegisterForm />);
    expect(getByText(/Personal/)).toBeInTheDocument();
  });

  it('should render only Personal Info as the second step', () => {
    const {container} = render(<RegisterForm />);

    submitFormByClickingInSubmitButton(container);

    const {loginForm, personalInfoForm, deliveryForm} = getFormsElements(
      container,
    );

    expect(loginForm).not.toBeInTheDocument();
    expect(personalInfoForm).toBeInTheDocument();
    expect(deliveryForm).not.toBeInTheDocument();
  });

  it('should has a Delivery step', () => {
    const {getByText} = render(<RegisterForm />);
    expect(getByText(/Delivery/)).toBeInTheDocument();
  });

  it('should render Delivery Info as the third step', () => {
    const {container} = render(<RegisterForm />);

    // first submit Login form
    submitFormByClickingInSubmitButton(container);

    // second submit Personal info form
    submitFormByClickingInSubmitButton(container);

    const {loginForm, personalInfoForm, deliveryForm} = getFormsElements(
      container,
    );

    expect(loginForm).not.toBeInTheDocument();
    expect(personalInfoForm).not.toBeInTheDocument();
    expect(deliveryForm).toBeInTheDocument();
  });

  it('should has a finish step', () => {
    const {getByText} = render(<RegisterForm />);
    expect(getByText(/Finish/)).toBeInTheDocument();
  });

  it('should render success message as the last step', () => {
    const {container, queryByText} = render(
      <RegisterForm onSubmit={jest.fn()} />,
    );

    // submit Login form
    submitFormByClickingInSubmitButton(container);
    // submit Personal info form
    submitFormByClickingInSubmitButton(container);
    // submit Delivery info form
    submitFormByClickingInSubmitButton(container);

    const {loginForm, personalInfoForm, deliveryForm} = getFormsElements(
      container,
    );

    expect(loginForm).not.toBeInTheDocument();
    expect(personalInfoForm).not.toBeInTheDocument();
    expect(deliveryForm).not.toBeInTheDocument();
    expect(queryByText(/Thanks for registering!/)).toBeInTheDocument();
  });
});
