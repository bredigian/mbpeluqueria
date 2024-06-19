import { API_URL } from '@/constants/api';
import { IWeekday } from '@/types/weekdays.types';
import { TResponse } from '@/types/responses.types';

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/weekdays`, {
      method: 'GET',
    });
    const data: TResponse = await response.json();
    if ('statusCode' in data) return new Error(data.message);

    return data as IWeekday[];
  } catch (error) {
    return error;
  }
};
