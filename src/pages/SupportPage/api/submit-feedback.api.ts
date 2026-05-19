import type { BodyType } from '../../../shared/uikit/Form/interfaces';
import { FEEDBACK_STUB_URL } from '../constants/support-form.constants';

export type FeedbackPayload = {
  name: string;
  email: string;
  topic: string;
  platform: string;
  subject: string;
  message: string;
  source: 'numivox-support-web';
  sentAt: string;
};

export async function submitFeedback(body: BodyType): Promise<FeedbackPayload> {
  const payload: FeedbackPayload = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    topic: String(body.topic ?? ''),
    platform: String(body.platform ?? ''),
    subject: String(body.subject ?? ''),
    message: String(body.message ?? ''),
    source: 'numivox-support-web',
    sentAt: new Date().toISOString(),
  };

  const response = await fetch(FEEDBACK_STUB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submit failed: ${response.status}`);
  }

  return payload;
}
