import { Badge } from '@vapor-ui/core';
import { CloseOutlineIcon } from '@vapor-ui/icons';

type Props = {
  keyword: string;
  onRemove: () => void;
  onClick: () => void;
};

export function KeywordBadge({ keyword, onRemove, onClick }: Props) {
  return (
    <Badge onClick={onClick} color="hint" size="md" shape="pill" className="bg-white shadow">
      {keyword}
      <CloseOutlineIcon
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        size={14}
        className="cursor-pointer"
      />
    </Badge>
  );
}
