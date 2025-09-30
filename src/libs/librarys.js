import bcrypt from 'bcryptjs';
import jsonWebToken from 'jsonwebtoken';

export const { hash, compare } = bcrypt;

export const { sign, verify, decode } = jsonWebToken;