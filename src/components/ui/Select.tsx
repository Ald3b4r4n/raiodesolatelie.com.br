import type { SelectHTMLAttributes } from "react";
import { useId } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
};

export function Select({
  error,
  helperText,
  id,
  label,
  name,
  options,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? `${name ?? "select"}-${generatedId}`;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field">
      <label className="field__label" htmlFor={selectId}>
        {label}
      </label>
      <select
        className="field__control"
        id={selectId}
        name={name}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
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
