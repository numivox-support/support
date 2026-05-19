import type { BodyType } from '../interfaces';

export const clearEmptyStrings = (body: BodyType | FormData): BodyType | FormData => {
  if (body instanceof FormData) {
    const cleanedFormData = new FormData();
    for (const [key, value] of body.entries()) {
      if (typeof value === 'string' && value.trim() === '') {
        continue;
      }
      cleanedFormData.append(key, value);
    }
    return cleanedFormData;
  }

  return Object.fromEntries(
    Object.entries(body)
      .filter(([, value]) => {
        if (typeof value === 'string') {
          return value.trim() !== '';
        }
        return true;
      })
      .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]),
  ) as BodyType;
};
