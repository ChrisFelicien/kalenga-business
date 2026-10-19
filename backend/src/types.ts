export enum UserRoles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CASHIER = 'cashier',
}

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  isActive: boolean;
  comparePassword: Promise<boolean>;
  updatedAt: Date;
  createdAt: Date;
};
