import React, { HTMLAttributes } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined';
  elevation?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  elevation = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'card';
  const variantClasses = `card--${variant}`;
  const elevationClasses = `card--elevation-${elevation}`;
  const classes = `${baseClasses} ${variantClasses} ${elevationClasses} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;