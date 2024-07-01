import { API_URL } from '@/constants/api';
import { IWeekday } from '@/types/weekdays.types';
import { TResponse } from '@/types/responses.types';

export const getAll = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/weekdays`, {
      method: 'GET',
      next: {
        tags: ['weekdays'],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: TResponse = await response.json();
    if ('statusCode' in data) return new Error(data.message);

    return data as IWeekday[];
  } catch (error) {
    return error;
  }
};

// Obtiene los "weekdays" con sus respectivos "workhours" pero le suma los turnos agendados que tiene cada día.
export const getAllWithUnavailableWorkhours = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/weekdays/unavailable-workhours`, {
      method: 'GET',
      next: {
        tags: ['weekdays'],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: TResponse = await response.json();
    if ('statusCode' in data) return new Error(data.message);

    return data as IWeekday[];
  } catch (error) {
    return error;
  }
};
