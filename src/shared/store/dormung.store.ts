import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type DormungState = {
  badges: { id: string; name: string; image: string }[];
  isFirstVisit: boolean;
  location: { lat: number; lng: number };
};
export type Badge = { id: string; name: string; image: string };

const INITIAL_BADGES = [
  {
    id: 'CONT_000000000500019',
    name: '감귤박물관',
    image: '/story-fragment-1.png',
  },
  {
    id: 'CONT_000000000500685',
    name: '한라산',
    image: '/story-fragment-3.png',
  },
  // {
  //   id: 'CONT_000000000500349',
  //   name: '성산일출봉',
  //   image: '/story-fragment-4.png',
  // },
  {
    id: 'CONT_000000000500150',
    name: '북촌돌하르방미술관',
    image: '/story-fragment-2.png',
  },
];

const initialState: DormungState = {
  isFirstVisit: true,
  badges: INITIAL_BADGES,
  location: { lat: 0, lng: 0 },
};

interface DormungAction {
  addBadge: (badge: Badge) => void;
  updateIsFirstVisit: (isFirstVisit: boolean) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
}
type DormungStore = DormungState & DormungAction;

export const useDormungStore = create<DormungStore>()(
  persist(
    (set) => ({
      isFirstVisit: initialState.isFirstVisit,
      badges: initialState.badges,
      location: initialState.location,
      addBadge: (badge: Badge) => set((state) => ({ ...state, badges: [...state.badges, badge] })),
      updateIsFirstVisit: (isFirstVisit: boolean) => set((state) => ({ ...state, isFirstVisit })),
      setLocation: (location: { lat: number; lng: number }) => set((state) => ({ ...state, location })),
    }),
    {
      name: 'dormung',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
