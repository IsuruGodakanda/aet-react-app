import '../index.css';

import { isEmpty } from 'lodash-es';
import React from 'react';

import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, makeStyles, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(() => ({
  input: {
    borderColor: '#cccccc !important',
    width: '320px',
  },
}));

interface IProps {
  id: string;
  name: string;
  type: string;
  value: string | number;
  label: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateField?: ((id: any) => IErrorObj) | undefined;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: [IconPrefix, IconName];
  iconPosition?: 'start' | 'end';
  className?: string;
  errorMsg?: string;
}

const TextComponent: React.FC<IProps> = (props: IProps) => {
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
    if (validateField) {
      setHelperText(validateField({ [id]: value }).errors[id]);
    }
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
        className={`${className} w-320px`}
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
  validateField: undefined,
  required: false,
  disabled: false,
  readOnly: false,
  icon: null,
  iconPosition: 'end',
  className: '',
  errorMsg: '',
};

export default TextComponent;
