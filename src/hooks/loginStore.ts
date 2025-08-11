import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TUser } from '@/types/user';

type TLoginStore = {
  user: TUser | undefined;
  setUser: (user: TUser) => void;
  resetUser: () => void;
};

// Create storage once at module level
const platformStorage =
  Platform.OS === 'web'
    ? {
        getItem: (name: string) => Promise.resolve(localStorage.getItem(name)),
        setItem: (name: string, value: string) => {
          localStorage.setItem(name, value);
          return Promise.resolve();
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        },
      }
    : {
        getItem: (name: string) => SecureStore.getItemAsync(name),
        setItem: (name: string, value: string) =>
          SecureStore.setItemAsync(name, value),
        removeItem: (name: string) => SecureStore.deleteItemAsync(name),
      };

export const useLoginStore = create(
  persist<TLoginStore>(
    (set) => ({
      user: undefined,
      setUser: (user: TUser) => set({ user }),
      resetUser: () => {
        onLogout();
        set({ user: undefined });
      },
    }),
    {
      name: 'user',
      storage: {
        getItem: async (name) => {
          const value = await platformStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await platformStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await platformStorage.removeItem(name);
        },
      },
    },
  ),
);

export function onLogout() {
  if (Platform.OS === 'web') {
    localStorage.clear();
    sessionStorage.clear();
  } else {
    SecureStore.deleteItemAsync('user');
  }
}
