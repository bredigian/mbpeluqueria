import { API_URL } from '@/constants/api';
import { IShift } from '@/types/shifts.types';
import { TResponse } from '@/types/responses.types';

export const getAllByUserId = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/shifts/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['shifts'],
      },
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) return new Error(data.message);

    return data as IShift[];
  } catch (error) {
    return error;
  }
};

export const createShift = async (payload: IShift) => {
  try {
    const response = await fetch(`${API_URL}/shifts`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result: TResponse = await response.json();
    if ('statusCode' in result) throw new Error(result.message);

    return result as IShift;
  } catch (error) {
    throw error;
  }
};
