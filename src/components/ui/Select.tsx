import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
  value?: string;
  name?: string;
  onChange?: (event: { target: { value: string; name?: string } }) => void;
  helperText?: string;
  error?: string;
  placeholder?: string;
  id?: string;
};

const EMPTY_OPTION_VALUE = "__empty__";

export function Select({
  error,
  helperText,
  id,
  label,
  name,
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

  return (
    <div className="field">
      <label className="field__label" htmlFor={selectId}>
        {label}
      </label>
      <RadixSelect.Root
        name={name}
        value={value}
        onValueChange={(nextValue) =>
          onChange?.({
            target: { value: nextValue === EMPTY_OPTION_VALUE ? "" : nextValue, name }
          })
        }
      >
        <RadixSelect.Trigger
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className="field__control field__control--select"
          id={selectId}
        >
          <RadixSelect.Value placeholder={placeholder ?? options[0]?.label} />
          <RadixSelect.Icon className="field__icon">
            <ChevronDown aria-hidden="true" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="select-content" position="popper">
            <RadixSelect.Viewport className="select-viewport">
              {options.map((option) => (
                <RadixSelect.Item
                  className="select-item"
                  key={option.value}
                  value={option.value === "" ? EMPTY_OPTION_VALUE : option.value}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="select-item__indicator">
                    <Check aria-hidden="true" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
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
