export const SuccessTypeEnum = {
  SHOW_ALL: 'showAll',
  CREATE_NEW: 'createNew',
  SAVE_EDIT: 'saveEdit',
} as const;

export type SuccessTypeEnumValue = (typeof SuccessTypeEnum)[keyof typeof SuccessTypeEnum];
