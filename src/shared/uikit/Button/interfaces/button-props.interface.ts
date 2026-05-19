import type { ReactNode } from 'react';

export interface IButtonProps {
  Icon?: ReactNode;
  value?: string;
  onClick?: () => void;
  maxWidth?: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  type?: 'button' | 'submit';
}
