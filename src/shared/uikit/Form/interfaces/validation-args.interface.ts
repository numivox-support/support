import type { Dispatch, SetStateAction } from 'react';
import type { RequiredFieldsTypeEnum } from '../enums';
import type { RequiredFieldsType } from './required-fields.interface';

export type ValidationArgs = {
  value: string | string[] | number[] | File | null;
  type: RequiredFieldsTypeEnum;
  required: boolean;
  key: string;
  setRequiredFields: Dispatch<SetStateAction<RequiredFieldsType>>;
};
