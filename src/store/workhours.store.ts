import { IWorkhour, IWorkhourByWeekdayToCreate } from '@/types/workhours.types';

import { API_URL } from '@/constants/api';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface IWorkhourStore {
  workhours: IWorkhour[] | null;

  getAllWorkhours: (token: string) => Promise<void>;
  create: (token: string, payload: IWorkhour) => Promise<void>;
  handleWorkhour: (
    token: string,
    payload: IWorkhourByWeekdayToCreate,
  ) => Promise<{ id: string } | {}>;
}

export const useWorkhourStore = create<IWorkhourStore>((set, get) => ({
  workhours: null,

  getAllWorkhours: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/workhours`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });
      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ workhours: data as IWorkhour[] });
    } catch (error) {
      throw error;
    }
  },
  create: async (token: string, payload: IWorkhour) => {
    try {
      const response = await fetch(`${API_URL}/workhours`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);

      await get().getAllWorkhours(token);
    } catch (error) {
      throw error;
    }
  },
  handleWorkhour: async (
    token: string,
    payload: IWorkhourByWeekdayToCreate,
  ) => {
    try {
      const response = await fetch(`${API_URL}/workhours-by-weekday`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);

      await get().getAllWorkhours(token);

      return result as IWorkhour;
    } catch (error) {
      throw error;
    }
  },
}));
