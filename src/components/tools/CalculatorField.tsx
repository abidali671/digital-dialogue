import type { ReactNode, Ref } from "react";

export function CalculatorField({
  id,
  label,
  value,
  symbol,
  suffix,
  placeholder,
  hint,
  hintId,
  describedBy,
  error,
  errorId,
  inputRef,
  inputMode = "decimal",
  onChange,
  onBlur,
}: {
  id: string;
  label: ReactNode;
  value: string;
  symbol?: string;
  suffix?: string;
  placeholder?: string;
  hint?: ReactNode;
  hintId?: string;
  describedBy?: string;
  error?: string;
  errorId: string;
  inputRef?: Ref<HTMLInputElement>;
  inputMode?: "decimal" | "numeric";
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label className="fee-label" htmlFor={id}>
        {label}
      </label>
      <div className="fee-field mt-1.5">
        {symbol && (
          <span className="fee-affix fee-affix-l" aria-hidden="true">
            {symbol}
          </span>
        )}
        <input
          ref={inputRef}
          id={id}
          className="fee-input"
          inputMode={inputMode}
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || (error ? errorId : undefined)}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
        {suffix && (
          <span className="fee-affix fee-affix-r" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={hintId} className="fee-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="fee-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Chevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
    </svg>
  );
}
