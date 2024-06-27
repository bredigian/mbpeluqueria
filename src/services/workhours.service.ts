import { IWorkhour, IWorkhourByWeekdayToCreate } from '@/types/workhours.types';

import { API_URL } from '@/constants/api';
import { TResponse } from '@/types/responses.types';

export const getAll = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/workhours`, {
      method: 'GET',
      next: {
        tags: ['workhours'],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) return new Error(result.message);

    return result as IWorkhour[];
  } catch (error) {
    return error;
  }
};

export const create = async (token: string, payload: IWorkhour) => {
  try {
    const response = await fetch(`${API_URL}/workhours`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const handleWorkhour = async (
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

    return result as IWorkhour[];
  } catch (error) {
    throw error;
  }
};
