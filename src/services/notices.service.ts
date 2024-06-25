import { API_URL } from '@/constants/api';
import { INotice } from '@/types/notices.types';
import { TResponse } from '@/types/responses.types';

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/notices`, {
      method: 'GET',
      next: {
        tags: ['notices'],
      },
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) return new Error(data.message);

    return data as INotice[];
  } catch (error) {
    return error;
  }
};

export const create = async (payload: INotice) => {
  try {
    const response = await fetch(`${API_URL}/notices`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) throw new Error(data.message);

    return data as INotice;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/notices?id=${id}`, {
      method: 'DELETE',
    });

    const data: TResponse = await response.json();
    if ('statusCode' in data) throw new Error(data.message);

    return data as INotice;
  } catch (error) {
    throw error;
  }
};
