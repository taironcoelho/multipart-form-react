import '@testing-library/jest-dom/extend-expect';
import PersonalInfoForm from '../../../components/RegisterForm/PersonalInfoForm';
import {
  renderWithProvider,
  changeInputValueEvent,
  expectSelectorToBeTruthy,
  expectSelectorToBeEmpty,
  submitFormByClickingInSubmitButton,
  cleanup,
} from '../../utils/test-utils';

describe('Components - PersonalInfo Form', () => {
  let container;
  const mockOnSubmit = jest.fn();
  const mockValidateCPF = jest.fn();

  beforeEach(() => {
    container = renderWithProvider(
      <PersonalInfoForm onSubmit={mockOnSubmit} />,
      {
        validation: {cpf: mockValidateCPF, password: () => {}},
      },
    ).container;
  });

  afterEach(cleanup);

  it('should has a form with submit button', () => {
    expectSelectorToBeTruthy(container, 'form');
    expectSelectorToBeTruthy(container, 'button[type="submit"]');
  });

  it('should has an empty name input on start', () => {
    expectSelectorToBeEmpty(container, 'input[id="name"]');
  });

  it('should has an empty lastname input on start', () => {
    expectSelectorToBeEmpty(container, 'input[id="lastname"]');
  });

  it('should has an empty CPF input on start', () => {
    expectSelectorToBeEmpty(container, 'input[id="cpf"]');
  });

  it('should be true the initial state for newsletter', () => {
    const offers = container.querySelector('input[id="offers"]');
    expect(offers).toBeChecked();
  });

  it('should be false the initial state for newsletter', () => {
    const newsletter = container.querySelector('input[id="newsletter"]');
    expect(newsletter).not.toBeChecked();
  });

  it('should call validateCpf on CPF blur', () => {
    mockValidateCPF.mockReturnValue({
      isValid: false,
      message: 'Some message',
    });

    const cpfInput = container.querySelector('input[id=cpf]');
    const nameInput = container.querySelector('input[id=name]');

    cpfInput.focus();
    changeInputValueEvent(cpfInput, '12345');
    nameInput.focus();

    expect(mockValidateCPF).toHaveBeenCalledTimes(1);
  });

  it('should show error message in CPF if validation fails', () => {
    const {container, queryAllByText} = renderWithProvider(
      <PersonalInfoForm onSubmit={mockOnSubmit} />,
      {
        validation: {cpf: mockValidateCPF, password: () => {}},
      },
    );

    mockValidateCPF.mockReturnValue({
      isValid: false,
      message: 'Some message',
    });

    const cpfInput = container.querySelector('input[id=cpf]');

    const nameInput = container.querySelector('input[id="name"]');

    cpfInput.focus();
    changeInputValueEvent(cpfInput, '12345');
    nameInput.focus();

    expect(queryAllByText(/Some message/).length).toBe(1);
  });

  it('should call onSubmit on form submit', () => {
    submitFormByClickingInSubmitButton(container);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
