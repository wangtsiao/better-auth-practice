
import { hash, verify, type Options } from '@node-rs/argon2';

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

/**
 * Hash a password using Argon2
 * @param password Plain text password
 * @returns The hashed password string
 */
export async function hashPassword(password: string) {
  return await hash(password, opts);
}

/**
 * Verify a password against an Argon2 hash
 * @param hashStr The hashed password
 * @param password The plain text password to verify
 * @returns True if the password matches the hash, false otherwise
 */
export async function verifyPassword(data: { hash: string; password: string; }) {
  const { hash: hashStr, password } = data;
  return await verify(hashStr, password, opts);
}
