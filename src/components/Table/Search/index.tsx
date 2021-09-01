import './index.css';

import Text from 'Components/InputFields/Text';
import React, { useState } from 'react';

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
      icon={['fas', 'search']}
      className="bg-white"
    />
  );
};

export default Search;
