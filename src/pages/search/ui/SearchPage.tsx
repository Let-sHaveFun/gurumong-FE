import { SearchInput } from './SearchInput';
import { useState } from 'react';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="flex flex-col gap-[12px] px-[16px] pt-[13px]">
        <SearchInput value={keyword} onChange={setKeyword} />
      </div>
    </div>
  );
};

export default SearchPage;
