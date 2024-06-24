export interface IAuthorization {
  access_token: string;
  exp?: number;

  id?: string;
  username?: string;
  name?: string;
  role?: TRole;
}

export type TRole = 'USER' | 'ADMIN';
