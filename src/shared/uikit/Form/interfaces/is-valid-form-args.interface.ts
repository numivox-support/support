import type { Dispatch, SetStateAction } from 'react';
import type { BodyType } from './body.interface';
import type { RequiredFieldsType } from './required-fields.interface';
import type { ITabButton } from './tab-button.interface';

export type IsValidFormArgs = {
  body: BodyType;
  requiredFields: RequiredFieldsType;
  setRequiredFields: Dispatch<SetStateAction<RequiredFieldsType>>;
  validationInTabs?: Dispatch<SetStateAction<ITabButton[]>>;
};
