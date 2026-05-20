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
import { PRIVACY_POLICY_URL, supportPageCopy } from './constants/support-page.copy';
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
      toast.success(supportPageCopy.successToast);
      setBody({ ...INITIAL_FORM_BODY });
      setConsentChecked(false);
      setRequiredFields({ ...INITIAL_REQUIRED_FIELDS });
    } catch {
      toast.error(supportPageCopy.errorToast);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const consentHasError = !requiredFields.consent?.isValid;

  return (
    <div className="support-page">
      <div className="support-page__glow support-page__glow--left" aria-hidden />
      <div className="support-page__glow support-page__glow--right" aria-hidden />

      <div className="support-page__inner">
        <header className="support-page__hero">
          <span className="support-page__badge">{supportPageCopy.badge}</span>
          <h1 className="support-page__title">{supportPageCopy.title}</h1>
          <p className="support-page__lead">{supportPageCopy.lead}</p>
          <ul className="support-page__features">
            {supportPageCopy.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </header>

        <section className="support-page__card">
          <h2 className="support-page__card-title">{supportPageCopy.formTitle}</h2>
          <p className="support-page__card-subtitle">{supportPageCopy.formSubtitle}</p>
          <p className="support-page__data-notice">{supportPageCopy.dataNotice}</p>

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
                  placeholder="How should We address You"
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
                  title="Your email"
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
                  title="Device"
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
                    placeholder="Brief summary of Your request"
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
                    placeholder="Describe Your request in detail"
                    value={body.message as string}
                    onChange={handleTextChange}
                    error={!requiredFields.message?.isValid}
                    setRequiredFields={setRequiredFields}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="support-page__form-full">
                  <label
                    className={`support-page__consent ${consentHasError ? 'support-page__consent--error' : ''}`}
                    htmlFor="support-consent"
                  >
                    <input
                      type="checkbox"
                      id="support-consent"
                      name="consent"
                      checked={consentChecked}
                      onChange={handleConsentChange}
                      disabled={isSubmitting}
                    />
                    <span className="support-page__consent-box" aria-hidden />
                    <span className="support-page__consent-text">
                      {supportPageCopy.consentLabel}{' '}
                      <a
                        href={PRIVACY_POLICY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {supportPageCopy.consentPrivacyLink}
                      </a>
                    </span>
                  </label>
                  {consentHasError && (
                    <span className="support-page__consent-error" role="alert">
                      {supportPageCopy.consentRequiredError}
                    </span>
                  )}
                </div>

                <div className="support-page__form-actions">
                  <Button
                    type="submit"
                    value={
                      isSubmitting
                        ? supportPageCopy.submittingButton
                        : supportPageCopy.submitButton
                    }
                    maxWidth="320px"
                  />
                </div>
                </div>
            </Form>
          </div>
        </section>

        <footer className="support-page__footer">
          <p>{supportPageCopy.footer}</p>
          <p>
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {supportPageCopy.footerPrivacy}
            </a>
          </p>
          <p className="support-page__footer-muted">{supportPageCopy.footerUpdated}</p>
        </footer>
      </div>
    </div>
  );
}
