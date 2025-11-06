import { formDataToPlainObject } from './form-data-to-plain-object';

describe('src:utils:form:form-data-to-plain-object', () => {
  test('It should convert FormData to a plain object', () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'johndoe@domain.com');
    formData.append('age', '30');
    formData.append('phone', '123-456-7890');

    const result = formDataToPlainObject(formData, {
      fieldTreatments: { phone: 'phone' },
    });

    expect(result).toStrictEqual({
      name: 'John Doe',
      email: 'johndoe@domain.com',
      age: '30',
      phone: '1234567890', // Assuming phone treatment is applied
    });
  });
});
