import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const widthClass = fullWidth ? 'btn--full-width' : '';
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;