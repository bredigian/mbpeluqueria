export interface IAuthorization {
  access_token: string;
  exp?: number;

  id?: string;
  phone_number?: string;
  name?: string;
  role?: TRole;
}

export type TRole = 'USER' | 'ADMIN';

export interface IPasswordRecovery {
  email: string;
}
