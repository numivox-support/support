import type { RequiredFieldsTypeEnum } from '../enums';

export type RequiredFieldsItemType = {
  required: boolean;
  type: RequiredFieldsTypeEnum;
  isValid: boolean;
  errorMessage: string;
  length?: number;
};

export type RequiredFieldsType = {
  [key: string]: RequiredFieldsItemType;
};
