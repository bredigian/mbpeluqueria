import { IAuthorization, IPasswordRecovery } from '@/types/auth.types';
import { TOnlyResponseMessage, TResponse } from '@/types/responses.types';

import { API_URL } from '@/constants/api';
import { IUser } from '@/types/users.types';

export const verifyToken = async (token: string, isPassRecover?: boolean) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/${!isPassRecover ? 'verify' : 'verify?isPassRecover=true'}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      },
    );
    const result: TResponse = await response.json();
    if ('statusCode' in result) return new Error(result.message);

    return result as IAuthorization;
  } catch (error) {
    return error;
  }
};

export const recoverPassword = async (payload: IPasswordRecovery) => {
  try {
    const response = await fetch(`${API_URL}/auth/recover`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) throw new Error(result.message);

    return result as TOnlyResponseMessage;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    const result: TResponse = await response.json();
    if ('statusCode' in result) throw new Error(result.message);

    return result as IUser;
  } catch (error) {
    throw error;
  }
};
