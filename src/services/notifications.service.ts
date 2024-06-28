import { API_URL } from '@/constants/api';
import { INotification } from '@/types/notifications.types';
import { TResponse } from '@/types/responses.types';

export const getAll = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/notifications`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['notifications'],
      },
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) return new Error(data.message);

    return data as INotification[];
  } catch (error) {
    return error;
  }
};

export const update = async (token: string, id: string) => {
  try {
    const response = await fetch(`${API_URL}/notifications?id=${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) throw new Error(data.message);

    return data as INotification;
  } catch (error) {
    throw error;
  }
};

export const deleteAll = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/notifications`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) throw new Error(data.message);

    return data as INotification[];
  } catch (error) {
    throw error;
  }
};
