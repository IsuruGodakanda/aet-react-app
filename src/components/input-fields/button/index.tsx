/* eslint-disable react/button-has-type */
import './index.css';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { Button } from '@material-ui/core';

interface ButtonProps {
  id: string;
  type: 'submit' | 'reset' | 'button';
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const useStyles = makeStyles({
  button: {
    color: '#FFFFFF',
    backgroundColor: '#036686',
    '&:hover, &:focus': {
      backgroundColor: '#005e7d',
    },
    '&:active': {
      backgroundColor: '#005e7d',
    },
  },
});

const ButtonComponent = (props: ButtonProps): JSX.Element => {
  const classes = useStyles({});
  const { id, type, value, onClick, disabled, className } = props;

  return (
    <Button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes.button} ${className}`}
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
