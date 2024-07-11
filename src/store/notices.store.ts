import { API_URL } from '@/constants/api';
import { INotice } from '@/types/notices.types';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface INoticeStore {
  notices: INotice[] | null;

  getAll: (token: string) => Promise<void>;
  create: (token: string, payload: INotice) => Promise<void>;
  deleteById: (token: string, id: string) => Promise<void>;
}

export const useNoticeStore = create<INoticeStore>((set, get) => ({
  notices: null,

  getAll: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/notices`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ notices: data as INotice[] });
    } catch (error) {
      throw error;
    }
  },
  create: async (token: string, payload: INotice) => {
    try {
      const response = await fetch(`${API_URL}/notices`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      await get().getAll(token);
    } catch (error) {
      throw error;
    }
  },
  deleteById: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/notices?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      await get().getAll(token);
    } catch (error) {
      throw error;
    }
  },
}));
