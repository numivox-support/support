import './styles/button.style.scss';
import {
  BUTTON_DEFAULT_BACKGROUND_COLOR,
  BUTTON_DEFAULT_BORDER_COLOR,
  BUTTON_DEFAULT_TEXT_COLOR,
} from './constants';
import type { IButtonProps } from './interfaces';

export function Button({
  Icon,
  value,
  onClick,
  maxWidth,
  backgroundColor,
  borderColor,
  color,
  type,
}: IButtonProps) {
  return (
    <button
      className="uikit-button"
      type={type ?? 'submit'}
      style={{
        maxWidth: maxWidth ?? '100%',
        backgroundColor: backgroundColor ?? BUTTON_DEFAULT_BACKGROUND_COLOR,
        borderColor: borderColor ?? BUTTON_DEFAULT_BORDER_COLOR,
        color: color ?? BUTTON_DEFAULT_TEXT_COLOR,
      }}
      onClick={onClick}
    >
      {Icon}
      {value}
    </button>
  );
}
