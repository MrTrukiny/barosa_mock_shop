import { atom, useRecoilState } from 'recoil';

// Recoil atom for storing the authentication state
export const isLoggedInAtom = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

// Custom hook to get and set isLoggedIn state
export const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};
