import crypto from 'node:crypto';
import bcrypt from "bcrypt";

export function hashUserPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');

  const hashedPassword = crypto.scryptSync(password, salt, 64);
  return hashedPassword.toString('hex') + ':' + salt;
}

export async function verifyPassword(storedPassword, suppliedPassword) {
  console.log("Inside");
  const isMatch=await bcrypt.compare(suppliedPassword, storedPassword);
  return isMatch
  
  
}