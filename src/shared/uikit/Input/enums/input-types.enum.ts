export const InputTypesEnum = {
  TEXT: 'text',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
  FILE: 'file',
  NUMBER: 'number',
  SLIDE_BTN: 'slide-btn',
} as const;

export type InputTypesEnumValue = (typeof InputTypesEnum)[keyof typeof InputTypesEnum];
