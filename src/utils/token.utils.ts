import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';


export const generateToken = (email:string) =>
   jwt.sign(email, "d48G8dmmyFKq");


export const verifyTOken = (token:string) =>
   jwt.verify(token, "d48G8dmmyFKq");






