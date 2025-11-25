// /** @jsxImportSource @emotion/react */
import React from 'react';

import { buttonStyle } from './style';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  ...props
}) => (
  <button type="button" css={buttonStyle} {...props}>
    {label}
    <span className="aaaa">ddd</span>
  </button>
);
