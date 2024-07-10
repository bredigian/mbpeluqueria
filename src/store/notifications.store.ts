import { API_URL } from '@/constants/api';
import { INotification } from '@/types/notifications.types';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface INotificationStore {
  notifications: INotification[] | null;

  getAll: (token: string) => Promise<void>;
  update: (token: string, id: string) => Promise<void>;
  deleteAll: (token: string) => Promise<void>;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  notifications: null,

  getAll: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ notifications: data as INotification[] });
    } catch (error) {
      throw error;
    }
  },
  update: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/notifications?id=${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);
    } catch (error) {
      throw error;
    }
  },
  deleteAll: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);
    } catch (error) {
      throw error;
    }
  },
}));
