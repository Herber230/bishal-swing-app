import { showToast } from './show-toast';

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));
const mockInfo = jest.requireMock('react-toastify').toast.info;
const mockSuccess = jest.requireMock('react-toastify').toast.success;
const mockWarning = jest.requireMock('react-toastify').toast.warning;
const mockError = jest.requireMock('react-toastify').toast.error;

describe('src:utils:ui:toast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should call toast.info for info type', () => {
    showToast('info', 'This is an info message');
    expect(mockInfo).toHaveBeenCalledWith('This is an info message');
  });

  test('It should call toast.success for success type', () => {
    showToast('success', 'This is a success message');
    expect(mockSuccess).toHaveBeenCalledWith('This is a success message');
  });

  test('It should call toast.warning for warning type', () => {
    showToast('warning', 'This is a warning message');
    expect(mockWarning).toHaveBeenCalledWith('This is a warning message');
  });

  test('It should call toast.error for error type', () => {
    showToast('error', 'This is an error message');
    expect(mockError).toHaveBeenCalledWith('This is an error message');
  });
});
