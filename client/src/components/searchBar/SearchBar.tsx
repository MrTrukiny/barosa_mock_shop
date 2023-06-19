import { Input } from '@chakra-ui/react';
import { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Input placeholder="Search by name, category or price" value={searchValue} onChange={handleSearchChange} mb={4} />
  );
};

export default SearchBar;
