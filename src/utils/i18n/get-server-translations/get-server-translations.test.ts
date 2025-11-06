import { getServerTranslations } from './get-server-translations';

jest.mock('next-intl/server', () => ({
  getMessages: jest.fn(),
}));
const mockGetMessages = require('next-intl/server').getMessages;

describe('src:utils:i18n:get-server-translations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('It should return a translation function that retrieves messages', async () => {
    expect.hasAssertions();

    const mockMessages = {
      greeting: {
        hello: 'Hello',
        goodbye: 'Goodbye',
      },
    };
    mockGetMessages.mockResolvedValue(mockMessages);

    const translations = await getServerTranslations({ ns: 'greeting' });

    expect(translations.t('hello')).toBe('Hello');
    expect(translations.t('goodbye')).toBe('Goodbye');
  });
});
