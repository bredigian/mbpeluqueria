import { API_URL } from '@/constants/api';
import { IAuthorization } from '@/types/auth.types';
import { IUser } from '@/types/users.types';
import { TResponse } from '@/types/responses.types';

export const signin = async (payload: IUser) => {
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) throw new Error(result.message);

    return result as IAuthorization;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) return new Error(result.message);

    return result;
  } catch (error) {
    throw error;
  }
};
