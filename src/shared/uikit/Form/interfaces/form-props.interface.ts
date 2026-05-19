import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import type { BodyType } from './body.interface';
import type { RequiredFieldsType } from './required-fields.interface';
import type { ITabButton } from './tab-button.interface';

export interface IFormProps {
  children: ReactNode;
  body: BodyType | FormData;
  requiredFields: RequiredFieldsType;
  fetchFunction: (body: BodyType | FormData) => Promise<void>;
  setRequiredFields: Dispatch<SetStateAction<RequiredFieldsType>>;
  successFunction?: (data: BodyType | FormData) => void;
  isFormData?: boolean;
  requestByEtap?: RequestByEtap[];
  validationInTabs?: Dispatch<SetStateAction<ITabButton[]>>;
  formRef?: RefObject<HTMLFormElement>;
}

export type RequestByEtap = {
  fetchFunction: (body: BodyType | FormData, id?: number) => void;
  body: BodyType[] | FormData[];
  successFunction?: () => void;
  errorFunction?: () => void;
  isCompleted: boolean;
};
