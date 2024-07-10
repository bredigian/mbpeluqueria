import { API_URL } from '@/constants/api';
import { DateTime } from 'luxon';
import { IShift } from '@/types/shifts.types';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface IShiftStore {
  shifts: IShift[] | null;

  getAllByUserId: (token: string) => Promise<void>;
  getNextByUserId: (token: string) => Promise<void>;
  getOfDate: (token: string, date: DateTime) => Promise<void>;
  createShift: (token: string, payload: IShift) => Promise<void>;
  cancelShift: (token: string, id: string) => Promise<void>;
}

export const useShiftStore = create<IShiftStore>((set, get) => ({
  shifts: null,

  getAllByUserId: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/shifts/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ shifts: data as IShift[] });
    } catch (error) {
      throw error;
    }
  },
  getNextByUserId: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/shifts/next/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ shifts: data as IShift[] });
    } catch (error) {
      throw error;
    }
  },
  getOfDate: async (token: string, date: DateTime) => {
    try {
      const response = await fetch(`${API_URL}/shifts?date=${date}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });

      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ shifts: data as IShift[] });
    } catch (error) {
      throw error;
    }
  },
  createShift: async (token: string, payload: IShift) => {
    try {
      const response = await fetch(`${API_URL}/shifts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);
    } catch (error) {
      throw error;
    }
  },
  cancelShift: async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/shifts?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result: TResponse = await response.json();
      if ('statusCode' in result) throw new Error(result.message);
    } catch (error) {
      throw error;
    }
  },
}));
