import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './input.module.sass';

const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <input ref={ref} className={clsx(styles.input, className)} {...props}>
        {children}
      </input>
    );
  }
);

export default Input;