import { IWorkhour, IWorkhourByWeekdayToCreate } from '@/types/workhours.types';

import { API_URL } from '@/constants/api';
import { TResponse } from '@/types/responses.types';

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/workhours`, {
      method: 'GET',
      next: {
        tags: ['workhours'],
      },
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) return new Error(result.message);

    return result as IWorkhour[];
  } catch (error) {
    return error;
  }
};

export const create = async (payload: IWorkhour) => {
  try {
    const response = await fetch(`${API_URL}/workhours`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['workhours'],
      },
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) throw new Error(result.message);

    return result as IWorkhour;
  } catch (error) {
    throw error;
  }
};

export const handleWorkhour = async (payload: IWorkhourByWeekdayToCreate) => {
  try {
    const response = await fetch(`${API_URL}/workhours-by-weekday`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) throw new Error(result.message);

    return result as IWorkhour[];
  } catch (error) {
    throw error;
  }
};
