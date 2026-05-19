import { DeleteIcon } from '../Icon';
import type { IDeleteBtnProps } from './interfaces';
import './styles/delete-btn.style.scss';

export function DeleteBtn({ onDelete }: IDeleteBtnProps) {
  return (
    <button type="button" className="uikit-delete-btn" onClick={onDelete} aria-label="Удалить">
      <DeleteIcon />
    </button>
  );
}
