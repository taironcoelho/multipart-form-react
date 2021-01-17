import '@testing-library/jest-dom/extend-expect';
import {renderHook, act} from '@testing-library/react-hooks';
import useError from '../../hooks/useError';

describe('Hooks - useError', () => {
  const mockValidationInvalidFunc = jest.fn();
  const mockSomeValidationFunc2 = jest.fn();
  const validation = {
    func1: mockValidationInvalidFunc,
    func2: mockSomeValidationFunc2,
  };
  let renderedHook;

  beforeEach(() => {
    renderedHook = renderHook(() => useError(validation)).result;
  });

  it('should be valid the initial state', () => {
    const error = renderedHook.current[0];

    expect(error['func1'].isValid).toBeTruthy();
    expect(error['func2'].isValid).toBeTruthy();
  });

  it('should call only the selected field validation function', () => {
    const validateFields = renderedHook.current[1];

    act(() => {
      validateFields('func2', 'some value');
    });

    expect(mockValidationInvalidFunc).toHaveBeenCalledTimes(0);
    expect(mockSomeValidationFunc2).toHaveBeenCalledTimes(1);
  });

  it('should return false in allowSubmit when one function return invalid', () => {
    mockValidationInvalidFunc.mockReturnValue({
      isValid: false,
      message: 'Some message',
    });

    const validateFields = renderedHook.current[1];
    let allowSubmitResponse = true;

    act(() => {
      validateFields('func1', 'some value');
    });

    act(() => {
      const allowSubmit = renderedHook.current[2];
      allowSubmitResponse = allowSubmit();
    });

    expect(allowSubmitResponse).toBeFalsy();
  });
});
