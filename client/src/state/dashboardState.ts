import { atom } from 'recoil';

export const activeTabAtom = atom<number>({
  key: 'activeTab',
  default: 0,
});
