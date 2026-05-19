import type { BodyType } from '../interfaces';
import { normalizeValue } from './normalize-value.helper';

export const convertFormData = (body: BodyType): FormData => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      let index = 0;
      if (value.length > 0) {
        value.forEach((v) => {
          formData.append(`${key}[${index}]`, normalizeValue(v));
          index++;
        });
      }
    } else {
      formData.append(key, normalizeValue(value));
    }
  });

  return formData;
};
