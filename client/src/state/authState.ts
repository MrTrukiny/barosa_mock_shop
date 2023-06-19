import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

// Recoil atom for storing the authentication state
export const isLoggedInAtom = atom<boolean>({
  key: 'isLoggedIn',
  default: localStorage.getItem('isLoggedIn') === 'true' || false, // Check local storage for initial state
});

// Custom hook to get and set isLoggedIn state
export const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  useEffect(() => {
    // Update local storage when isLoggedIn changes
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};
