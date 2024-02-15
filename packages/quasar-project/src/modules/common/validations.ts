import { reactive } from "vue";
import { PasswordValidator } from "../auth/types";

export function validateEmail(email: string): boolean {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export function validateUsername(username: string): boolean {
  return /^[a-z0-9\-\.]+$/.test(username);
}

export function validatePassword(password: string): boolean {
  // Test length
  const isValid = password.length >= 6;

  return isValid;
}

export function validateName(name: string): boolean {
  return name.trim().length > 2;
}

export function requiredField(field: string): boolean {
  return !!field;
}

export const validPassword = reactive(<PasswordValidator>{
  length: false,
  capital: false,
  number: false,
  symbol: false,
});
