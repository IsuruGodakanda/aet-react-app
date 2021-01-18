import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { get, isEmpty, sortBy } from 'lodash-es';
import { withStyles } from '@material-ui/core';
import '../index.css';

const SharedAutoComplete = withStyles({
  option: {
    '&[data-focus="true"]': {
      backgroundColor: '#faeeed',
    },
  },
  inputRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: '#cccccc',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: '#cccccc',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: '#cccccc',
    },
  },
})(Autocomplete);

const DropDown = (props: {
  id: string;
  options: IOptionObj[];
  selectedOption: IOptionObj | undefined;
  label?: string;
  disabled?: boolean;
  sortedBy?: string;
  style?: Record<string, unknown>;
  placeholder?: string;
  disableClearable?: boolean;
  isSearchable?: boolean;
  onSelectionChange: (event: any, value: unknown) => void;
  getOptionLabel?: ((event: any, name?: string) => string) | undefined;
}): JSX.Element => {
  const {
    id,
    options,
    selectedOption,
    label,
    disabled,
    sortedBy,
    style,
    placeholder,
    disableClearable,
    isSearchable,
    onSelectionChange,
    getOptionLabel,
  } = props;

  const preventInputSearchable = (event) => {
    event.preventDefault();
  };

  const preventInputDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <SharedAutoComplete
      id={id}
      options={!isEmpty(options) && !isEmpty(sortedBy) ? sortBy(options, [sortedBy]) : options}
      value={selectedOption}
      style={style}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          placeholder={placeholder || ''}
          // tslint:disable-next-line:no-empty
          onClick={!isSearchable ? preventInputSearchable : () => {}}
          // tslint:disable-next-line:no-empty
          onKeyPress={!isSearchable ? preventInputDefault : () => {}}
          style={{ caretColor: !isSearchable ? 'transparent' : '' }}
        />
      )}
      onChange={(event, value) => onSelectionChange(event, value)}
      getOptionSelected={(option) => get(option, 'id', '') === get(selectedOption, 'id', '')}
      disabled={disabled}
      disableClearable={disableClearable}
    />
  );
};

DropDown.defaultProps = {
  label: '',
  disabled: false,
  sortedBy: '',
  style: {},
  placeholder: '',
  disableClearable: true,
  isSearchable: false,
  getOptionLabel: undefined,
};

export default DropDown;
