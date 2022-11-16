import createHttpError from 'http-errors';
import {PrismaClient, Applicant} from '@prisma/client';

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

export const createApplicant = async (input: Applicant) => {
  const email = input.email?.trim();
  const name = input.name?.trim();
  const tel = input.tel?.trim();
  const profile = input.profile?.trim();
  const quiz_score = Math.floor(Math.random() * 11);

  if (!email) {
    throw createHttpError(422, "email can't be blank" );
  }
  if (!name) {
    throw createHttpError(422, "name can't be blank" );
  }
  if (!tel) {
    throw createHttpError(422, "password can't be blank" );
  }
  if (!profile) {
    throw createHttpError(422, "profile can't be blank" );
  }

  await checkEmail(email);

  const applicant = await prisma.applicant.create({
    data: {
      name,
      email,
      tel,
      profile,
      quiz_score
    },
    select: {
      email: true,
      name: true,
    },
  }) as Applicant;

  return {
    ...applicant
  };
};

export const updateApplicant = async (applicantPayload: any, id: number) => {
  const { name, email, tel, profile, interview, quiz_score } = applicantPayload;
  
  const applicant = await prisma.applicant.update({
    where: {
      id: id,
    },
    data: {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(tel ? { tel } : {}),
      ...(profile ? {profile} : {}),
      ...(interview),
      ...(quiz_score ? { quiz_score } : {}),
    },
    select: {
      name: true,
      email: true,
      tel: true,
      profile: true,
      interview: true,
      quiz_score: true,

    },
  }) as Applicant;
  
  return {
    ...applicant,
  };
};

export const findApplicantIdByEmail = async (email: string) => {
  const applicant = await prisma.applicant.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  }) as Applicant;

  if (!applicant) {
    throw createHttpError(404, "applicant not found." );
  }

  return applicant;
};

export const listAllApplicants = async () => {
  const applicant = await prisma.applicant.findMany() as Applicant[];

  if (!applicant) {
    throw createHttpError(404, "" );
  }

  return applicant;
};

export const deleteApplicant =async (id:number) => {
  const applicant = await prisma.applicant.delete({
    where: {
      id: id,
    },
  });

  return applicant;
}

export const applicantInterview = async (interview: boolean, id: number) => {
  console.log(interview)
  const applicant = await prisma.applicant.update({
    where: {
      id: id,
    },
    data: {
      interview
    },
    select: {
      name: true,
      email: true,
      tel: true,
      profile: true,
      interview: true,
      quiz_score: true,

    },
  }) as Applicant;
  console.log(applicant)
  return {
    ...applicant,
  };
};