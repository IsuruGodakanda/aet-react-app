import './index.css';

import React, { useState } from 'react';
import Text from 'Components/input-fields/text';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onSearch: (value: string) => void;
}

const Search = (props: IProps): JSX.Element => {
  const { onSearch } = props;
  const [search, setSearch] = useState('');

  const onInputChange = (value: string): void => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <Text
      id="search"
      name="search"
      type="text"
      label="search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
      icon={faSearch}
      className="bg-white"
    />
  );
};

export default Search;
