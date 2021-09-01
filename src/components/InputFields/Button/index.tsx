/* eslint-disable react/button-has-type */
import './index.css';

import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  id: string;
  type: 'submit' | 'reset' | 'button';
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  theme?: 'primary' | 'secondary' | 'dangour';
}

const useStyles = makeStyles({
  primary: {
    color: '#FFFFFF',
    backgroundColor: '#036686',
    '&:hover, &:focus': {
      backgroundColor: '#005e7d',
    },
    '&:active': {
      backgroundColor: '#005e7d',
    },
  },
  dangour: {
    color: '#FFFFFF',
    backgroundColor: '#CA554E',
    '&:hover, &:focus': {
      backgroundColor: '#a6453f',
    },
    '&:active': {
      backgroundColor: '#a6453f',
    },
  },
});

const ButtonComponent: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles({});
  const { id, type, value, onClick, disabled, className, theme = 'primary' } = props;

  return (
    <Button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes[theme]} ${className}`}
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
  theme: 'primary',
};

export default ButtonComponent;
