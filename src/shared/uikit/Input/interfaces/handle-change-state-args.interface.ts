import type { ChangeEvent } from 'react';
import type { BodyType } from '../../Form/interfaces';

export type HandleChangeStateArgs = {
  e: ChangeEvent<HTMLInputElement>;
  state: BodyType;
  setState: (state: BodyType) => void;
};
