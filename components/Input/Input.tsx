import React, { InputHTMLAttributes } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const baseClasses = 'input';
  const errorClass = error ? 'input--error' : '';
  const widthClass = fullWidth ? 'input--full-width' : '';
  const classes = `${baseClasses} ${errorClass} ${widthClass} ${className}`.trim();

  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classes}
        {...props}
      />
      {error && (
        <div className="input-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;