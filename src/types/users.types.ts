export interface IUser {
  id?: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  role: ERole;
}

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
