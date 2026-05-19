export const RequiredFieldsTypesEnum = {
  TEXT: 'text',
  PASSWORD: 'password',
  EMAIL: 'email',
  NUMBER: 'number',
  DATE: 'date',
  FILE: 'file',
  MULTI_SELECT: 'multi-select',
  SELECT: 'select',
  BY_LENGTH: 'by-length',
} as const;

export type RequiredFieldsTypeEnum =
  (typeof RequiredFieldsTypesEnum)[keyof typeof RequiredFieldsTypesEnum];

export const ValidationTestsRegex = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;
