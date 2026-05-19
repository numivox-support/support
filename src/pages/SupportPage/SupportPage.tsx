import { useCallback, useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input, Loader } from '../../shared/uikit';
import type { BodyType, RequiredFieldsType } from '../../shared/uikit/Form/interfaces';
import { InputTypesEnum } from '../../shared/uikit/Input/enums';
import { submitFeedback } from './api/submit-feedback.api';
import {
  INITIAL_FORM_BODY,
  INITIAL_REQUIRED_FIELDS,
  PLATFORM_OPTIONS,
  TOPIC_OPTIONS,
} from './constants/support-form.constants';
import './support-page.scss';

export function SupportPage() {
  const [body, setBody] = useState<BodyType>({ ...INITIAL_FORM_BODY });
  const [requiredFields, setRequiredFields] = useState<RequiredFieldsType>({
    ...INITIAL_REQUIRED_FIELDS,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setBody((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSelectChange = useCallback((value: string | string[], name: string) => {
    setBody((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleConsentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setConsentChecked(checked);
    setBody((prev) => ({ ...prev, consent: checked ? 'yes' : '' }));
  }, []);

  const fetchFunction = useCallback(async (submitBody: BodyType | FormData) => {
    if (submitBody instanceof FormData) return;

    setIsSubmitting(true);
    try {
      await submitFeedback(submitBody);
      toast.success('Message sent! We will reply to your email within 24–48 hours.');
      setBody({ ...INITIAL_FORM_BODY });
      setConsentChecked(false);
      setRequiredFields({ ...INITIAL_REQUIRED_FIELDS });
    } catch {
      toast.error('Could not send your message. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <div className="support-page">
      <div className="support-page__glow support-page__glow--left" aria-hidden />
      <div className="support-page__glow support-page__glow--right" aria-hidden />

      <div className="support-page__inner">
        <header className="support-page__hero">
          <span className="support-page__badge">Numivox · Support</span>
          <h1 className="support-page__title">
            Support for a mobile brain training game
          </h1>
          <p className="support-page__lead">
            Numivox is built around fast math blitz rounds: solve problems against the clock,
            sharpen your focus, and track your progress. If something went wrong in the game,
            with payments, or your account — reach out using the form below.
          </p>
          <ul className="support-page__features">
            <li>Math blitz and speed challenge modes</li>
            <li>Progress sync across devices</li>
            <li>Support team replies by email</li>
          </ul>
        </header>

        <section className="support-page__card">
          <h2 className="support-page__card-title">Contact us</h2>
          <p className="support-page__card-subtitle">
            Fill in the fields below and we will forward your request to our support team.
          </p>

          <div className="support-page__form-wrap">
            {isSubmitting && <Loader />}

            <Form
              body={body}
              requiredFields={requiredFields}
              setRequiredFields={setRequiredFields}
              fetchFunction={fetchFunction}
            >
              <div className="support-page__form-grid">
                <Input
                  type={InputTypesEnum.TEXT}
                  inputType="text"
                  inputId="support-name"
                  inputName="name"
                  title="Your name"
                  placeholder="How should we address you"
                  value={body.name as string}
                  onChange={handleTextChange}
                  error={!requiredFields.name?.isValid}
                  setRequiredFields={setRequiredFields}
                  disabled={isSubmitting}
                />

                <Input
                  type={InputTypesEnum.TEXT}
                  inputType="email"
                  inputId="support-email"
                  inputName="email"
                  title="Reply email"
                  placeholder="name@example.com"
                  value={body.email as string}
                  onChange={handleTextChange}
                  error={!requiredFields.email?.isValid}
                  setRequiredFields={setRequiredFields}
                  disabled={isSubmitting}
                />

                <Input
                  type={InputTypesEnum.SELECT}
                  inputType="text"
                  inputId="support-topic"
                  inputName="topic"
                  title="Topic"
                  value={body.topic as string}
                  selectOptions={TOPIC_OPTIONS}
                  selectOnChange={handleSelectChange}
                  error={!requiredFields.topic?.isValid}
                  setRequiredFields={setRequiredFields}
                  disabled={isSubmitting}
                />

                <Input
                  type={InputTypesEnum.SELECT}
                  inputType="text"
                  inputId="support-platform"
                  inputName="platform"
                  title="Platform"
                  value={body.platform as string}
                  selectOptions={PLATFORM_OPTIONS}
                  selectOnChange={handleSelectChange}
                  error={!requiredFields.platform?.isValid}
                  setRequiredFields={setRequiredFields}
                  disabled={isSubmitting}
                />

                <div className="support-page__form-full">
                  <Input
                    type={InputTypesEnum.TEXT}
                    inputType="text"
                    inputId="support-subject"
                    inputName="subject"
                    title="Subject"
                    placeholder="e.g. Blitz score not updating"
                    value={body.subject as string}
                    onChange={handleTextChange}
                    error={!requiredFields.subject?.isValid}
                    setRequiredFields={setRequiredFields}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="support-page__form-full">
                  <Input
                    type={InputTypesEnum.TEXTAREA}
                    inputType="text"
                    inputId="support-message"
                    inputName="message"
                    title="Message"
                    placeholder="What happened, what you expected, and steps to reproduce"
                    value={body.message as string}
                    onChange={handleTextChange}
                    error={!requiredFields.message?.isValid}
                    setRequiredFields={setRequiredFields}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="support-page__form-full">
                  <Input
                    type={InputTypesEnum.CHECKBOX}
                    inputType="checkbox"
                    inputId="support-consent"
                    inputName="consent"
                    title="I agree to the processing of my personal data so support can respond"
                    checked={consentChecked}
                    onCheckboxChange={handleConsentChange}
                    error={!requiredFields.consent?.isValid}
                    setRequiredFields={setRequiredFields}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="support-page__form-actions">
                  <Button
                    type="submit"
                    value={isSubmitting ? 'Sending…' : 'Send message'}
                    maxWidth="320px"
                  />
                </div>
              </div>
            </Form>
          </div>
        </section>

        <footer className="support-page__footer">
          <p>© Numivox. Math blitz and brain training in one app.</p>
        </footer>
      </div>
    </div>
  );
}
