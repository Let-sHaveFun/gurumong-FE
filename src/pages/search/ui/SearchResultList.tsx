import type { Heritage } from '@/mocks/mockHeritages';
import { LocationIcon } from '@vapor-ui/icons';
import { useNavigate } from 'react-router-dom';

type Props = {
  results: any[];
  onSelect: (heritage: Heritage) => void;
};

export function SearchResultList({ results, onSelect }: Props) {
  const navigate = useNavigate();

  if (!results.length) return null;

  return (
    <ul className="mt-2 overflow-hidden divide-y divide-gray-100 bg-white shadow">
      {results.map((heritage) => (
        <li
          key={heritage.id}
          onClick={() => {
            onSelect(heritage);
            navigate(`/search?query=${encodeURIComponent(heritage.name)}&id=${heritage['externalId']}`);
          }}
          className="flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <LocationIcon size={20} className="text-blue-400" />
            <p className="text-xs text-blue-500 mt-0.5">{heritage.distance}m</p>
          </div>

          <div className="flex flex-col items-start justify-center gap-1">
            <p className="text-sm font-medium text-gray-900">{heritage.name}</p>
            <p className="text-xs text-gray-500">{heritage.address}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
