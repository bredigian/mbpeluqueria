import { API_URL } from '@/constants/api';
import { IWeekday } from '@/types/weekdays.types';
import { TResponse } from '@/types/responses.types';
import { create } from 'zustand';

interface IWeekdayStore {
  weekdays: IWeekday[] | null;
  availableWeekdays: IWeekday[] | null;
  unAvailableWeekdays: IWeekday[] | null;

  getAll: (token: string) => Promise<void>;
  getAllWithUnavailableWorkhours: (token: string) => Promise<void>;
}

export const useWeekdayStore = create<IWeekdayStore>((set, get) => ({
  weekdays: null,
  availableWeekdays: null,
  unAvailableWeekdays: null,

  getAll: async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/weekdays`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });
      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({ weekdays: data as IWeekday[] });
    } catch (error) {
      throw error;
    }
  },
  getAllWithUnavailableWorkhours: async (token: string) => {
    try {
      const response = await fetch(
        `${API_URL}/weekdays/unavailable-workhours`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-cache',
        },
      );
      const data: TResponse = await response.json();
      if ('statusCode' in data) throw new Error(data.message);

      set({
        weekdays: data as IWeekday[],
        availableWeekdays: (data as IWeekday[]).filter(
          (item) => item.WorkhoursByWeekday.length > 0,
        ),
        unAvailableWeekdays: (data as IWeekday[]).filter(
          (item) => item.WorkhoursByWeekday.length === 0,
        ),
      });
    } catch (error) {
      throw error;
    }
  },
}));
