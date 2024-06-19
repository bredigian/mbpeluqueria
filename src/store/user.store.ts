import { API_URL } from '@/constants/api';
import { IAuthorization } from '@/types/auth.types';
import { IUser } from '@/types/users.types';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface IUserStore {
  id: string | null;
  username: string | null;
  name: string | null;
  signin: (payload: IUser) => Promise<IAuthorization>;
  verifySession: (token: string) => Promise<IAuthorization>;
  logout: () => void;
}

export const userStore = create<IUserStore>((set) => ({
  id: null,
  username: null,
  name: null,

  signin: async (payload: IUser) => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);

      const { id, name, username } = result as IAuthorization;
      set({ id, name, username });

      return result as IAuthorization;
    } catch (error) {
      throw error;
    }
  },
  verifySession: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);

      const { id, name, username } = result as IAuthorization;
      set({ id, name, username });

      return result as IAuthorization;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {},
}));
