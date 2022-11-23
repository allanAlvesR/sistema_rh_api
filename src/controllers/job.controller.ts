import { NextFunction, Request, Response, Router } from 'express';
import {
  addApplicantToJob,
  createJob,
  listAllJobs,
  findJob,
  applicantInterview
} from '../services/job.service'

const router = Router();

router.post('/jobs', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const job = await createJob(req.body);
      res.json({ job });
    } catch (error) {
      next(error);
    }
  });

router.post('/jobs/:id/applicants/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await addApplicantToJob(Number(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/jobs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listAllJobs();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/jobs/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await findJob(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/jobs/:jobId/interview/:applicantId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await applicantInterview(req.body.interview, Number(req.params.jobId), Number(req.params.applicantId));
    res.json({ user });
  } catch (error) {
    next(error);
  }
});


export default router;
