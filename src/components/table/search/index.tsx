import './index.css';

import Text from 'Components/input-fields/text';
import React, { useState } from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<IProps> = (props: IProps) => {
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
      label="Search by name"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
      icon={faSearch}
      className="bg-white"
    />
  );
};

export default Search;
