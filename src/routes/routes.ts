import { Router } from 'express';
import userController from '../controllers/user.controller';
import applicantController from '../controllers/applicant.controller'
import jobController from '../controllers/job.controller'

const api = Router()
  .use(userController)
  .use(applicantController)
  .use(jobController);

export default Router().use('/api', api);
