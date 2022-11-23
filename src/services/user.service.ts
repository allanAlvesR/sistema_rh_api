import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import {PrismaClient, User} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {generateToken} from '../utils/token.utils'

const prisma = new PrismaClient();



const checkEmail = async (email: string) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (checkEmail) {
    throw createHttpError(422,"email has already been taken");
  }
};

export const createUser = async (input: User) => {
  const email = input.email?.trim();
  const name = input.name?.trim();
  const password = input.password?.trim();

  if (!email) {
    throw createHttpError(422, "email can't be blank" );
  }
  if (!name) {
    throw createHttpError(422, "name can't be blank" );
  }
  if (!password) {
    throw createHttpError(422, "password can't be blank" );
  }

  await checkEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      email: true,
      name: true,
    },
  }) as User;

  return {
    ...user
  };
};

export const login = async (userPayload: any) => {
  const email = userPayload.email?.trim();
  const password = userPayload.password?.trim();

  if (!email) {
    throw createHttpError(422, "email can't be blank" );
  }

  if (!password) {
    throw createHttpError(422, "password can't be blank" );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
      password: true,
    },
  }) as User;

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email,
        name: user.name,
        token: generateToken(user.email),
      };
    }
  }

  throw createHttpError(403, "email or password is invalid");
};

export const getLoggedUser = async (email: string) => {
  const user = (await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
    },
  })) as User;

  return {
    ...user
  };
};



