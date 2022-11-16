import { NextFunction, Request, Response, Router } from 'express';
import {
  listAllApplicants,
  createApplicant,
  updateApplicant,
  applicantInterview
} from '../services/applicant.service'

const router = Router();

router.post('/applicants', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createApplicant(req.body);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  });

router.get('/applicants', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listAllApplicants();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/applicants/interview/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await applicantInterview(req.body.interview, Number(req.params.id));
    console.log(req.body.interview)
    res.json({ user });
  } catch (error) {
    next(error);
  }
});


export default router;
