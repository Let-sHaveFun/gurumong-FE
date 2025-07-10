import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type DormungState = { badges: number[]; isFirstVisit: boolean };

const initialState: DormungState = {
  isFirstVisit: true,
  badges: [],
};

interface DormungAction {
  addBadge: (badge: number) => void;
  updateIsFirstVisit: (isFirstVisit: boolean) => void;
}
type DormungStore = DormungState & DormungAction;

export const useDormungStore = create<DormungStore>()(
  persist(
    (set) => ({
      isFirstVisit: initialState.isFirstVisit,
      badges: initialState.badges,
      addBadge: (badge: number) => set((state) => ({ ...state, badges: [...state.badges, badge] })),
      updateIsFirstVisit: (isFirstVisit: boolean) => set((state) => ({ ...state, isFirstVisit })),
    }),
    {
      name: 'dormung',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
