import { RequiredFieldsTypesEnum } from '../../../shared/uikit/Form/enums';
import type { BodyType, RequiredFieldsType } from '../../../shared/uikit/Form/interfaces';
import type { ISelectOption } from '../../../shared/uikit/Input/interfaces';

/** Stub API with open CORS (works without a backend proxy). */
export const FEEDBACK_STUB_URL = 'https://jsonplaceholder.typicode.com/posts';

export const TOPIC_OPTIONS: ISelectOption[] = [
  { value: 'account', label: 'Account & progress' },
  { value: 'other', label: 'Other' },
];

export const PLATFORM_OPTIONS: ISelectOption[] = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
];

export const INITIAL_FORM_BODY: BodyType = {
  name: '',
  email: '',
  topic: '',
  platform: '',
  subject: '',
  message: '',
  consent: '',
};

export const INITIAL_REQUIRED_FIELDS: RequiredFieldsType = {
  name: {
    required: true,
    type: RequiredFieldsTypesEnum.TEXT,
    isValid: true,
    errorMessage: 'Please enter your name',
  },
  email: {
    required: true,
    type: RequiredFieldsTypesEnum.EMAIL,
    isValid: true,
    errorMessage: 'Please enter a valid email',
  },
  topic: {
    required: true,
    type: RequiredFieldsTypesEnum.SELECT,
    isValid: true,
    errorMessage: 'Please select a topic',
  },
  platform: {
    required: true,
    type: RequiredFieldsTypesEnum.SELECT,
    isValid: true,
    errorMessage: 'Please select a platform',
  },
  subject: {
    required: true,
    type: RequiredFieldsTypesEnum.TEXT,
    isValid: true,
    errorMessage: 'Please add a short subject',
  },
  message: {
    required: true,
    type: RequiredFieldsTypesEnum.TEXT,
    isValid: true,
    errorMessage: 'Please describe your issue in more detail',
  },
  consent: {
    required: true,
    type: RequiredFieldsTypesEnum.TEXT,
    isValid: true,
    errorMessage: 'You must agree to the Privacy Policy to submit a request',
  },
};
