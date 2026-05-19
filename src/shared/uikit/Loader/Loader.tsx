import type { ILoaderProps } from './interfaces';
import './styles/loader.style.scss';

export function Loader({ className }: ILoaderProps) {
  return (
    <div className={`uikit-loader ${className ?? ''}`.trim()} role="status" aria-label="Loading">
      <span />
      <span />
      <span />
    </div>
  );
}
