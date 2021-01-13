/* eslint-disable react/button-has-type */
import './index.css';

import React from 'react';

import { Button } from '@material-ui/core';

interface ButtonProps {
  id: string;
  type: 'submit' | 'reset' | 'button';
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const ButtonComponent = (props: ButtonProps): JSX.Element => {
  const { id, type, value, onClick, disabled, className } = props;

  return (
    <Button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      variant="contained"
      color="primary"
    >
      {value}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  disabled: false,
  className: '',
};

export default ButtonComponent;
