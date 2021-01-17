import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../../components/RegisterForm/LoginForm';
import {
  renderWithProvider,
  changeInputValueEvent,
  expectSelectorToBeTruthy,
  expectSelectorToBeEmpty,
  submitFormByClickingInSubmitButton,
  cleanup,
} from '../../utils/test-utils';

describe('Components - Delivery Form', () => {
  let container;
  const mockOnSubmit = jest.fn();
  const mockValidatePassword = jest.fn();

  beforeEach(() => {
    container = renderWithProvider(<LoginForm onSubmit={mockOnSubmit} />, {
      validation: {cpf: () => {}, password: mockValidatePassword},
    }).container;
  });

  afterEach(cleanup);

  it('should has a form with submit button', () => {
    expectSelectorToBeTruthy(container, 'form');
    expectSelectorToBeTruthy(container, 'button[type="submit"]');
  });

  it('should has an empty email input on start', () => {
    expectSelectorToBeEmpty(container, 'input[type="email"]');
  });

  it('should has an empty password input on start', () => {
    expectSelectorToBeEmpty(container, 'input[type="password"]');
  });

  it('should has a password confirmation input', () => {
    expectSelectorToBeEmpty(container, 'input[id="confirmPassword"]');
  });

  it('should call validatePassword on password blur', () => {
    mockValidatePassword.mockReturnValue({
      isValid: false,
      message: 'Some message',
    });

    const passwordInput = container.querySelector('input[id=password]');
    const confirmPasswordInput = container.querySelector(
      'input[id=confirmPassword]',
    );
    passwordInput.focus();
    changeInputValueEvent(passwordInput, '12345');
    confirmPasswordInput.focus();

    expect(mockValidatePassword).toHaveBeenCalledTimes(1);
  });

  it('should call validatePassword on confirmPassword blur', () => {
    mockValidatePassword.mockReturnValue({
      isValid: false,
      message: 'Some message',
    });

    const confirmPasswordInput = container.querySelector(
      'input[id=confirmPassword]',
    );

    const emailInput = container.querySelector('input[type="email"]');

    confirmPasswordInput.focus();
    changeInputValueEvent(confirmPasswordInput, '12345');
    emailInput.focus();

    expect(mockValidatePassword).toHaveBeenCalledTimes(1);
  });

  it('should show error message in password if validation fails', () => {
    const {container, queryAllByText} = renderWithProvider(
      <LoginForm onSubmit={mockOnSubmit} />,
      {
        validation: {cpf: () => {}, password: mockValidatePassword},
      },
    );

    mockValidatePassword.mockReturnValue({
      isValid: false,
      message: 'Some message',
    });

    const confirmPasswordInput = container.querySelector(
      'input[id=confirmPassword]',
    );

    const emailInput = container.querySelector('input[type="email"]');

    confirmPasswordInput.focus();
    changeInputValueEvent(confirmPasswordInput, '12345');
    emailInput.focus();

    expect(queryAllByText(/Some message/).length).toBe(2);
  });

  it('should call onSubmit on form submit', () => {
    submitFormByClickingInSubmitButton(container);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
