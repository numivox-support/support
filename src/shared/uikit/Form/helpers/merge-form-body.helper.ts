import type { FormEvent } from 'react';
import type { BodyType } from '../interfaces';

/** Merges React state with native form values (fixes browser autofill). */
export const mergeFormBody = (
  event: FormEvent<HTMLFormElement>,
  body: BodyType | FormData,
): BodyType => {
  if (body instanceof FormData) {
    return {};
  }

  const fromDom = Object.fromEntries(
    Array.from(new FormData(event.currentTarget).entries()).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : String(value),
    ]),
  );

  const state = body as BodyType;
  const consentFromDom = fromDom.consent === 'on' ? 'yes' : fromDom.consent;

  return {
    ...state,
    name: fromDom.name || state.name,
    email: fromDom.email || state.email,
    subject: fromDom.subject || state.subject,
    message: fromDom.message || state.message,
    topic: state.topic || fromDom.topic,
    platform: state.platform || fromDom.platform,
    consent: consentFromDom || state.consent,
  };
};
