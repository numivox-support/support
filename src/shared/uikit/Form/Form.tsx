import type { FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertFormData, isValidForm, mergeFormBody } from './helpers';
import type { BodyType, IFormProps } from './interfaces';

export function Form({
  children,
  body,
  requiredFields,
  fetchFunction,
  setRequiredFields,
  isFormData,
  validationInTabs,
  formRef,
}: IFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mergedBody = mergeFormBody(e, body);

    const cleanedBody = Object.fromEntries(
      Object.entries(mergedBody)
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        .filter(([, value]) => !(typeof value === 'string' && value === '')),
    ) as BodyType;

    const validationResult = isValidForm({
      body: cleanedBody,
      requiredFields,
      setRequiredFields,
      validationInTabs,
    });

    const hasErrors = Object.keys(validationResult).length > 0;

    if (hasErrors) {
      Object.values(validationResult).forEach((value) => {
        if (!value.isValid) {
          toast.error(value.errorMessage);
        }
      });
      return;
    }

    if (isFormData) {
      void fetchFunction(convertFormData(cleanedBody));
    } else {
      void fetchFunction(cleanedBody);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} noValidate>
      <ToastContainer theme="dark" />
      {children}
    </form>
  );
}
