import { RecentKeywordList } from './RecentKeywordList';
import { SearchInput } from './SearchInput';
import { useState, useEffect } from 'react';

const LOCAL_KEY = 'recent_keywords';

const saveToLocalStorage = (keywords: string[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(keywords));
};

const loadFromLocalStorage = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
};

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  useEffect(() => {
    const stored = loadFromLocalStorage();
    setRecentKeywords(stored);
  }, []);

  const handleKeywordSubmit = (newKeyword: string) => {
    if (!newKeyword.trim()) return;

    const filtered = recentKeywords.filter((k) => k !== newKeyword);
    const updated = [newKeyword, ...filtered].slice(0, 10);

    setRecentKeywords(updated);
    saveToLocalStorage(updated);
  };

  const handleChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="flex flex-col gap-[12px] px-[16px] pt-[13px]">
        <SearchInput value={keyword} onChange={handleChange} onSubmit={handleKeywordSubmit} />
        <RecentKeywordList
          keywords={recentKeywords}
          onRemove={(kw) => {
            const updated = recentKeywords.filter((k) => k !== kw);
            setRecentKeywords(updated);
            saveToLocalStorage(updated);
          }}
          onClick={(kw) => {
            setKeyword(kw);
            handleKeywordSubmit(kw);
          }}
        />
      </div>
    </div>
  );
};

export default SearchPage;
