import { IAuthorization, TRole } from '@/types/auth.types';

import { API_URL } from '@/constants/api';
import Cookies from 'js-cookie';
import { IUser } from '@/types/users.types';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface IUserStore {
  id: string | null;
  phone_number: string | null;
  name: string | null;
  role: TRole | null;
  signup: (payoload: IUser) => Promise<IAuthorization>;
  signin: (payload: IUser) => Promise<IAuthorization>;
  verifySession: (token: string) => Promise<IAuthorization>;
  logout: () => void;
}

export const userStore = create<IUserStore>((set) => ({
  id: null,
  phone_number: null,
  name: null,
  role: null,

  signup: async (payload: IUser) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);

      const { id, name, phone_number, role } = result as IAuthorization;
      set({ id, name, phone_number, role });

      return result as IAuthorization;
    } catch (error) {
      throw error;
    }
  },

  signin: async (payload: IUser) => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);

      const { id, name, phone_number, role } = result as IAuthorization;
      set({ id, name, phone_number, role });

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

      const { id, name, phone_number, role } = result as IAuthorization;
      set({ id, name, phone_number, role });

      return result as IAuthorization;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      Cookies.remove('token');
      set({ id: null, phone_number: null, name: null });
    } catch (error) {
      throw error;
    }
  },
}));
