import { API_URL } from '@/constants/api';
import { Summary } from '@/types/summary.types';
import { User } from '@/types/user.types';
import { create } from 'zustand';

export const useShifts = create((set: any, get: any) => ({
  shifts: null as Summary[] | null,

  getShifts: async (user: User) => {
    const response = await fetch(
      `${API_URL}/shifts?name=${user?.name}&phone=${user?.phone}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );
    const { message, shifts } = await response.json();
    if (!response.ok) throw new Error(message);

    set({ shifts });
  },

  cancelShift: async (_id: string) => {
    const response = await fetch(`${API_URL}/shifts?_id=${_id}`, {
      method: 'DELETE',
    });
    const { message } = await response.json();
    if (!response.ok) throw new Error(message);

    set({
      shifts: get().shifts?.filter((shift: Summary) => shift._id !== _id),
    });
  },
}));
