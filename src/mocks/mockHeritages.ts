export type Heritage = {
  id: string;
  name: string;
  address: string;
  distance: number;
};

export const mockHeritages: Heritage[] = [
  { id: '1', name: '성산일출봉', address: '제주 서귀포시 성산읍', distance: 463 },
  { id: '2', name: '섭지코지', address: '제주 서귀포시 고성리', distance: 1200 },
  { id: '3', name: '광치기해변', address: '제주 서귀포시 성산읍', distance: 850 },
  { id: '4', name: '성산일출봉2', address: '제주 서귀포시 성산읍', distance: 463 },
];
