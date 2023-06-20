import { useEffect, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

// Recoil atom for storing the authentication state
export const isLoggedInAtom = atom<boolean>({
  key: 'isLoggedIn',
  default: localStorage.getItem('isLoggedIn') === 'true' || false, // Check local storage for initial state
});

// Recoil atom for storing the userId
export const userIdAtom = atom<string>({
  key: 'userId',
  default: localStorage.getItem('userId') || '', // Check local storage for initial state
});

// Custom hook to get and set isLoggedIn state and userId
export const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);

  useEffect(() => {
    // Update local storage when isLoggedIn or userId changes
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    localStorage.setItem('userId', userId || '');
  }, [isLoggedIn, userId]);

  const login = useMemo(
    () => (id: string) => {
      setIsLoggedIn(true);
      setUserId(id);
    },
    [setIsLoggedIn, setUserId],
  );

  const logout = useMemo(
    () => () => {
      setIsLoggedIn(false);
      setUserId('');
    },
    [setIsLoggedIn, setUserId],
  );

  return useMemo(() => ({ isLoggedIn, userId, login, logout }), [isLoggedIn, userId, login, logout]);
};
