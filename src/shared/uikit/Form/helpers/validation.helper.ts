import { RequiredFieldsTypesEnum, ValidationTestsRegex } from '../enums';
import type { ValidationArgs } from '../interfaces';

export const validation = ({
  value,
  type,
  required,
  key,
  setRequiredFields,
}: ValidationArgs): boolean => {
  let isValid = false;

  if (required || value !== '') {
    switch (type) {
      case RequiredFieldsTypesEnum.SELECT:
        isValid = Array.isArray(value) ? value.length > 0 : value !== '';
        break;
      case RequiredFieldsTypesEnum.EMAIL:
        isValid = !Array.isArray(value) && ValidationTestsRegex.EMAIL.test(value as string);
        break;
      case RequiredFieldsTypesEnum.PASSWORD:
        isValid = !Array.isArray(value) && ValidationTestsRegex.PASSWORD.test(value as string);
        break;
      case RequiredFieldsTypesEnum.FILE:
        isValid = value !== null && value !== '';
        break;
      default:
        isValid = !Array.isArray(value) && value !== null && String(value).length > 0;
        break;
    }
  } else {
    isValid = true;
  }

  setRequiredFields((prevData) => ({
    ...prevData,
    [key]: {
      ...prevData[key],
      isValid,
    },
  }));

  return isValid;
};
