export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone_number: string;
  password?: string;
  role: ERole;
}

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
