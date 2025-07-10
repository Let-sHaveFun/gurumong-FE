import { RecentKeywordList } from './RecentKeywordList';
import { SearchInput } from './SearchInput';
import { useState, useEffect } from 'react';
import type { Heritage } from '@/mocks/mockHeritages';
import { searchHeritages } from '@/mocks/searchHeritages';
import { SearchResultList } from './SearchResultList';
import { useSearchParams } from 'react-router-dom';
import { ResultMap } from '@/shared/ui/ResultMap';
import { search } from '../api';

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
  const [results, setResults] = useState<Heritage[]>([]);

  const [params] = useSearchParams();
  const id = params.get('id');
  const query = params.get('query') ?? '';

  useEffect(() => {
    const stored = loadFromLocalStorage();
    setRecentKeywords(stored);
  }, []);

  // useEffect(() => {
  //   if (!keyword.trim()) {
  //     setResults([]);
  //     return;
  //   }

  //   const timeout = setTimeout(async () => {
  //     const data = await searchHeritages(keyword);
  //     setResults(data);
  //   }, 300);

  //   return () => clearTimeout(timeout);
  // }, [keyword]);

  if (query && id) {
    return <ResultMap query={query} id={id} />;
  }

  const handleKeywordSubmit = async (newKeyword: string) => {
    if (!newKeyword.trim()) return;

    const filtered = recentKeywords.filter((k) => k !== newKeyword);
    const updated = [newKeyword, ...filtered].slice(0, 10);

    setRecentKeywords(updated);
    saveToLocalStorage(updated);
  };

  const handleChange = async (value: string) => {
    setKeyword(value);
    const data = await search(value);
    setResults(data);
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="flex flex-col gap-[12px] px-[16px] pt-[16px]">
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
      <SearchResultList
        results={results}
        onSelect={(heritage) => {
          handleKeywordSubmit(heritage.name);
        }}
      />
    </div>
  );
};

export default SearchPage;
