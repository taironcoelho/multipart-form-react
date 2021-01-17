import '@testing-library/jest-dom/extend-expect';
import {
  render,
  expectSelectorToBeTruthy,
  expectSelectorToBeEmpty,
  submitFormByClickingInSubmitButton,
  cleanup,
} from '../../utils/test-utils';
import DeliveryForm from '../../../components/RegisterForm/DeliveryForm';

describe('Components - Delivery Form', () => {
  let container;
  const mockOnSubmit = jest.fn();
  beforeEach(() => {
    container = render(<DeliveryForm onSubmit={mockOnSubmit} />).container;
  });

  afterEach(cleanup);

  it('should has a form', () => {
    expectSelectorToBeTruthy(container, 'form');
    expectSelectorToBeTruthy(container, 'button[type="submit"]');
  });

  it('should has a submit button', () => {
    expectSelectorToBeTruthy(container, 'button[type="submit"]');
  });

  it('should zip code be empty on start', () => {
    expectSelectorToBeEmpty(container, 'input[id=zipCode]');
  });

  it('should city be empty on start', () => {
    expectSelectorToBeEmpty(container, 'input[id=city]');
  });

  it('should state/province  be empty on start', () => {
    expectSelectorToBeEmpty(container, 'input[id=province]');
  });

  it('should address be empty on start', () => {
    expectSelectorToBeEmpty(container, 'input[id=address]');
  });

  it('should building number be empty on start', () => {
    expectSelectorToBeEmpty(container, 'input[id=buildingNumber]');
  });

  it('should call onSubmit on form submit', () => {
    submitFormByClickingInSubmitButton(container);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
