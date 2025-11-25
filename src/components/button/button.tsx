import React from 'react';

import './button.module.css';
// side-effect
import styles from './button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  ...props
}) => {
  return (
    <button className={styles.btn} {...props}>
      {label}
    </button>
  );
};
