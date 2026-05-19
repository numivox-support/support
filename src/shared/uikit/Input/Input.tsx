import type { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactInputMask from 'react-input-mask';
import Select, { type MultiValue, type SingleValue } from 'react-select';
import { DeleteBtn } from '../DeleteBtn';
import { FileIcon, UploadIcon } from '../Icon';
import { RequiredFieldsTypesEnum, validation } from '../Form';
import { InputTypesEnum } from './enums';
import type { IInputProps, ISelectOption } from './interfaces';
import './styles/input.style.scss';

export function Input({
  inputType,
  type,
  inputId,
  inputName,
  title,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  IconLeft,
  IconRight,
  selectOptions,
  selectOnChange,
  files,
  maxLength,
  deleteFile,
  description,
  allowTypes,
  onFileChange,
  onDateChange,
  maxWidth,
  onCheckboxChange,
  selectIsMulti,
  checked,
  setRequiredFields,
  mask,
}: IInputProps) {
  const validateSelectChange = (selectValue: string | string[], name: string) => {
    if (!setRequiredFields) return;
    validation({
      value: selectValue,
      type: RequiredFieldsTypesEnum.SELECT,
      required: true,
      key: name,
      setRequiredFields,
    });
  };

  switch (type) {
    case InputTypesEnum.TEXT:
      return (
        <label
          htmlFor={inputId}
          className={`input-text ${error ? 'input-text-error' : ''} ${disabled ? 'input-text-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          {title && <span className="input-title">{title}</span>}
          <span className="input-container">
            {IconLeft}
            {mask ? (
              <ReactInputMask
                mask={mask}
                value={value?.toString() ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange?.(e);
                  if (!setRequiredFields) return;
                  validation({
                    value: e.target.value,
                    type: RequiredFieldsTypesEnum.TEXT,
                    required: true,
                    key: inputName,
                    setRequiredFields,
                  });
                }}
                disabled={disabled}
              >
                {() => (
                  <input
                    type="text"
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder ?? ''}
                    className="input"
                  />
                )}
              </ReactInputMask>
            ) : (
              <input
                type={inputType}
                id={inputId}
                name={inputName}
                placeholder={placeholder ?? ''}
                value={value?.toString() ?? ''}
                onChange={(e) => {
                  onChange?.(e);
                  if (!setRequiredFields) return;
                  validation({
                    value: e.target.value,
                    type: RequiredFieldsTypesEnum.TEXT,
                    required: true,
                    key: inputName,
                    setRequiredFields,
                  });
                }}
                onInput={(e) =>
                  onChange?.({ target: e.currentTarget } as ChangeEvent<HTMLInputElement>)
                }
                disabled={disabled}
                className="input"
                autoComplete={
                  inputName === 'email' ? 'email' : inputName === 'name' ? 'name' : 'off'
                }
              />
            )}
            {IconRight}
          </span>
        </label>
      );
    case InputTypesEnum.TEXTAREA:
      return (
        <label
          htmlFor={inputId}
          className={`input-text ${error ? 'input-text-error' : ''} ${disabled ? 'input-text-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          {title && <span className="input-title">{title}</span>}
          <span className="input-container textarea">
            {IconLeft}
            <textarea
              id={inputId}
              name={inputName}
              placeholder={placeholder ?? ''}
              value={value?.toString() ?? ''}
              onChange={(e) => {
                onChange?.(e);
                if (!setRequiredFields) return;
                validation({
                  value: e.target.value,
                  type: RequiredFieldsTypesEnum.TEXT,
                  required: true,
                  key: inputName,
                  setRequiredFields,
                });
              }}
              onInput={(e) =>
                onChange?.({ target: e.currentTarget } as ChangeEvent<HTMLTextAreaElement>)
              }
              disabled={disabled}
              className="input"
            />
            {IconRight}
          </span>
        </label>
      );
    case InputTypesEnum.FILE:
      return (
        <div className="file-upload" style={{ maxWidth: maxWidth ?? '100%' }}>
          <span className="title">{title}</span>
          <span className="description">{description}</span>
          <div className="photo-upload">
            {files?.map((file, idx) => (
              <div className="uploaded-photo-item" key={idx}>
                {file instanceof File && file.type.includes('image') ? (
                  <img src={URL.createObjectURL(file)} alt={file.name} className="uploaded-img" />
                ) : (
                  <span className="uploaded-file-name">
                    {file.name}
                    <span className="icon">
                      <FileIcon />
                    </span>
                  </span>
                )}
                {deleteFile && <DeleteBtn onDelete={() => deleteFile(file)} />}
              </div>
            ))}
            {(!files || files.length < (maxLength ?? 10)) && (
              <div className="photo-upload-area">
                <label htmlFor={inputId} className="input-photo">
                  <input
                    type="file"
                    id={inputId}
                    name={inputName}
                    multiple
                    accept={allowTypes?.join(',') ?? ''}
                    onChange={onFileChange}
                  />
                  <span className="icon">
                    <UploadIcon />
                  </span>
                  <span className="input-file-title">Загрузить {title}</span>
                </label>
              </div>
            )}
          </div>
        </div>
      );
    case InputTypesEnum.SELECT:
      return (
        <label
          htmlFor={inputId}
          className={`input-text input-select ${selectIsMulti ? 'input-select-multi' : ''} ${error ? 'input-text-error' : ''} ${disabled ? 'input-text-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          {title && <span className="input-title">{title}</span>}
          <span className="input-container">
            {selectIsMulti ? (
              <Select<ISelectOption, true>
                inputId={inputId}
                options={selectOptions ?? []}
                value={
                  Array.isArray(value) && Array.isArray(selectOptions)
                    ? value
                        .map((item) => selectOptions.find((option) => option.value === item))
                        .filter((option): option is ISelectOption => Boolean(option))
                    : []
                }
                onChange={(selected: MultiValue<ISelectOption>) => {
                  if (!selectOnChange) return;
                  const newValue = selected.map((option) => option.value);
                  selectOnChange(newValue, inputName);
                  validateSelectChange(newValue, inputName);
                }}
                isDisabled={disabled}
                name={inputName}
                isMulti
              />
            ) : (
              <Select<ISelectOption, false>
                inputId={inputId}
                options={selectOptions ?? []}
                value={selectOptions?.find((option) => option.value === String(value)) ?? null}
                onChange={(selected: SingleValue<ISelectOption>) => {
                  if (!selectOnChange) return;
                  const newValue = selected?.value ?? '';
                  selectOnChange(newValue, inputName);
                  validateSelectChange(newValue, inputName);
                }}
                isDisabled={disabled}
                name={inputName}
              />
            )}
          </span>
        </label>
      );
    case InputTypesEnum.DATE:
      return (
        <label
          htmlFor={inputId}
          className={`input-text ${error ? 'input-text-error' : ''} ${disabled ? 'input-text-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          {title && <span className="input-title">{title}</span>}
          <span className="input-container">
            <DatePicker
              selected={value as Date}
              onChange={(date: Date | null) => onDateChange && date && onDateChange(date, inputName)}
              disabled={disabled}
              dateFormat="dd.MM.yyyy"
              className="input"
            />
          </span>
        </label>
      );
    case InputTypesEnum.TIME:
      return (
        <label
          htmlFor={inputId}
          className={`input-text ${error ? 'input-text-error' : ''} ${disabled ? 'input-text-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          {title && <span className="input-title">{title}</span>}
          <span className="input-container">
            <DatePicker
              selected={value as Date}
              onChange={(date: Date | null) => onDateChange && date && onDateChange(date, inputName)}
              disabled={disabled}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              className="input"
            />
          </span>
        </label>
      );
    case InputTypesEnum.CHECKBOX:
      return (
        <label
          htmlFor={inputId}
          className={`input-checkbox ${error ? 'input-checkbox-error' : ''} ${disabled ? 'input-checkbox-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          <input
            type="checkbox"
            id={inputId}
            name={inputName}
            checked={checked}
            onChange={onCheckboxChange}
            disabled={disabled}
          />
          <span className="input" />
          <span className="input-title">{title}</span>
        </label>
      );
    case InputTypesEnum.SLIDE_BTN:
      return (
        <label
          htmlFor={inputId}
          className={`input-slide-btn ${error ? 'input-slide-btn-error' : ''} ${disabled ? 'input-slide-btn-disabled' : ''}`}
          style={{ maxWidth: maxWidth ?? '100%' }}
        >
          {title && <span className="input-title">{title}</span>}
          <input
            type="checkbox"
            id={inputId}
            name={inputName}
            checked={checked}
            onChange={onCheckboxChange}
            disabled={disabled}
          />
          <span className="input" />
        </label>
      );
    default:
      return null;
  }
}
