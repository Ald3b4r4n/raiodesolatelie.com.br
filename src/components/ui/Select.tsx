import * as React from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  helperText?: string;
  error?: string;
  placeholder?: string;
  id?: string;
};

export function Select({
  error,
  helperText,
  id,
  label,
  name,
  defaultValue,
  options,
  onChange,
  placeholder,
  value
}: SelectProps) {
  const generatedId = React.useId();
  const selectId = id ?? `${name ?? "select"}-${generatedId}`;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;
  const selectValue = value === undefined ? undefined : value;
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange?.(event);
  };
  const handleInput: React.FormEventHandler<HTMLSelectElement> = (event) => {
    onChange?.(event as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="field">
      <label className="field__label" htmlFor={selectId}>
        {label}
      </label>
      <select
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className="field__control field__control--select"
        defaultValue={defaultValue}
        id={selectId}
        name={name}
        value={selectValue}
        onChange={handleChange}
        onChangeCapture={handleChange}
        onInput={handleInput}
        onInputCapture={handleInput}
      >
        {placeholder && !options.some((option) => option.value === "") ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? (
        <p className="field__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
