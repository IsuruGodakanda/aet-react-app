import { isEmpty } from 'lodash-es';
import React from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, makeStyles, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(() => ({
  input: {
    borderColor: '#cccccc !important',
    height: '55px',
  },
}));

interface TextProps {
  id: string;
  name: string;
  type: string;
  value: string | number;
  label: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (id: any) => { isValid: boolean; errors: any };
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: IconDefinition;
  iconPosition?: 'start' | 'end';
  className?: string;
  errorMsg?: string;
}

const TextComponent = (props: TextProps): JSX.Element => {
  const classes = useStyles({});
  const {
    id,
    name,
    type,
    value,
    label,
    placeholder,
    onChange,
    validateField,
    required,
    disabled,
    readOnly,
    icon,
    iconPosition,
    className,
    errorMsg,
  } = props;

  const [helperText, setHelperText] = React.useState(errorMsg);

  React.useEffect(() => {
    setHelperText(errorMsg);
  }, [errorMsg]);

  const checkValidity = () => {
    setHelperText(validateField({ [id]: value }).errors[id]);
  };

  return (
    <FormControl>
      <TextField
        id={id}
        name={name}
        type={type}
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event);
        }}
        onKeyUp={(event) => {
          if (event.keyCode !== 9) {
            checkValidity();
          }
        }}
        onBlur={() => {
          checkValidity();
        }}
        required={required}
        disabled={disabled}
        error={!isEmpty(helperText)}
        helperText={!isEmpty(helperText) && helperText}
        className={className}
        InputProps={
          icon
            ? {
                classes: {
                  notchedOutline: classes.input,
                },
                endAdornment: (
                  <InputAdornment position={iconPosition || 'end'}>
                    <FontAwesomeIcon icon={icon} size="lg" color="#cccccc" />
                  </InputAdornment>
                ),
                readOnly,
              }
            : {
                classes: { notchedOutline: classes.input },
                readOnly,
              }
        }
        variant="outlined"
      />
    </FormControl>
  );
};

TextComponent.defaultProps = {
  placeholder: '',
  required: false,
  disabled: false,
  readOnly: false,
  icon: null,
  iconPosition: 'end',
  className: '',
  errorMsg: '',
};

export default TextComponent;
