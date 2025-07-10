import { KeywordBadge } from './KeywordBadge';

type Props = {
  keywords: string[];
  onRemove: (keyword: string) => void;
  onClick: (keyword: string) => void;
};

export function RecentKeywordList({ keywords, onRemove, onClick }: Props) {
  if (keywords.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((kw) => (
        <KeywordBadge key={kw} keyword={kw} onRemove={() => onRemove(kw)} onClick={() => onClick(kw)} />
      ))}
    </div>
  );
}
