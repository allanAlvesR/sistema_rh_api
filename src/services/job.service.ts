import createHttpError from 'http-errors';
import {PrismaClient, Job, Applicant, JobApplicants} from '@prisma/client';

const prisma = new PrismaClient();


export const createJob = async (input: Job) => {
  const name = input.name?.trim();
  const description = input.description?.trim();
  const job_profile = input.job_profile?.trim();

  if (!name) {
    throw createHttpError(422, "name can't be blank" );
  }
  if (!description) {
    throw createHttpError(422, "description can't be blank" );
  }
  if (!job_profile) {
    throw createHttpError(422, "job profile can't be blank" );
  }

  const job= await prisma.job.create({
    data: {
      name,
      description,
      job_profile,
    },
    select: {
        name: true,
        description: true,
        job_profile: true,
    },
  }) as Job;

  return {
    ...job
  };
};

export const updateJob = async (jobPayload: any, id: number) => {
  const { name, description, job_profile, } = jobPayload;

  const job = await prisma.job.update({
    where: {
      id: id,
    },
    data: {
        name,
        description,
        job_profile,
      },
      select: {
          name: true,
          description: true,
          job_profile: true,
      },
  }) as Job;

  return {
    ...job,
  };
};

export const listAllJobs = async () => {
  const Jobs = await prisma.job.findMany() as Job[];

  if (!Jobs) {
    throw createHttpError(404, "" );
  }

  return Jobs;
};

export const deleteApplcant = async (id:number) => {
  const job = await prisma.job.delete({
    where: {
      id: id,
    },
  });

  return job;
}

export const findJob = async (id: number) => {
    const job = await prisma.job.findUnique({
      include: {applicants: {include: {applicant: true}}},
      where: {
        id,
      },
    }) as Job;
  
    if (!job) {
      throw createHttpError(404, "job not found." );
    }
  
    return job;
  };

export const addApplicantToJob =async (id: number, applicants: []) => {
    const data = applicants.map(id => {return({"applicantId": id, "quiz_score": Math.floor(Math.random() * 11)})})
    const job = findJob(id);
    
    const result = await prisma.job.update({
         where: { id: id },
         data: {
           applicants: { create: data},
         },
       });
    return result;
};

export const applicantInterview = async (interview: boolean, jobId: number, applicantId: number) => {
  const jobApplicants = await findJobApplicants(jobId, applicantId);
  console.log(jobApplicants, interview)
  const data = {"applicantId": applicantId, interview};
  const result = await prisma.jobApplicants.update({
    where: { id: jobApplicants.id},
    data: {
      interview,
    },
  });
return result;
};

export const findJobApplicants = async (jobId: number, applicantId: number) => {
  const jobApplicants = await prisma.jobApplicants.findFirst({
    where: {
      jobId,
      applicantId,
    },
  }) as JobApplicants;

  if (!jobApplicants) {
    throw createHttpError(404, "JobApplicants not found." );
  }

  return jobApplicants;
};