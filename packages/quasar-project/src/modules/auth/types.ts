export type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  resetPassword?: string;
};

export type LoginFormState = {
  email: string;
  password: string;
};

export type ResetPasswordFormState = {
  email: string;
};

export type PasswordValidator = {
  length: boolean;
  capital: boolean;
  number: boolean;
  symbol: boolean;
};

export type AuthStoreState = {
  accessToken: string | null;
  user: any;
};

export type CatchError = {
  code: number;
  message: string;
  name: string;
  response?: any;
};
