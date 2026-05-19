import type { IsValidFormArgs, RequiredFieldsType } from '../interfaces';
import { validation } from './validation.helper';

export const isValidForm = ({
  body,
  requiredFields,
  setRequiredFields,
  validationInTabs,
}: IsValidFormArgs): RequiredFieldsType => {
  const errors: RequiredFieldsType = {};

  Object.entries(requiredFields).forEach(([key, fieldConfig]) => {
    const rawValue = body[key];
    const value = Array.isArray(rawValue) ? rawValue : String(rawValue ?? '');

    const isValid = validation({
      value,
      type: fieldConfig.type,
      required: fieldConfig.required,
      key,
      setRequiredFields,
    });

    if (!isValid) {
      errors[key] = {
        ...fieldConfig,
        isValid: false,
      };
    }
  });

  if (validationInTabs) {
    validationInTabs((prevData) =>
      prevData.map((tab) => {
        if (tab.fields) {
          return {
            ...tab,
            isValid: tab.fields.every((field) => errors[field]?.isValid ?? true),
          };
        }
        return tab;
      }),
    );
  }

  return errors;
};
