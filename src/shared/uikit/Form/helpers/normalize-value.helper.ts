export const normalizeValue = (value: unknown): string | Blob => {
  if (value instanceof File || value instanceof Blob) {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    console.warn('Unexpected object in FormData:', value);
    return '';
  }

  return '';
};
