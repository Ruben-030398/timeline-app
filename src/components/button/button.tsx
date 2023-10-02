import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './button.module.sass';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = ButtonVariant.Primary, children, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(styles[`btn_${variant}`], className)}
      >
        {children}
      </button>
    );
  }
);

export default Button;