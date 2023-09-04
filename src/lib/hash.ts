import argon2 from "argon2";

export const hash = (text: string) => {
  return argon2.hash(text);
};

export const comparePasswords = (text: string, hashed: string) => {
  return argon2.verify(hashed, text);
};
