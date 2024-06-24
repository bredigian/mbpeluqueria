import { API_URL } from '@/constants/api';
import { IAuthorization } from '@/types/auth.types';
import { TResponse } from '@/types/responses.types';

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

    return result as IAuthorization;
  } catch (error) {
    return error;
  }
};
