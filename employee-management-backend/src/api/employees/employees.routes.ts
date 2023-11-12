import { Router, Request, Response } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares/middlewares';
import * as EmployeeHandlers from './employees.handlers';
import { Employee } from './employees.model';

const router = Router();

// router.get('/test', (req: Request, res: Response<Employee[]>) => {
//     res.json([{
//         firstName: "test first",
//         lastName: 'last name',
//         email: 'test@gmail.com',
//         phoneNumber: '0772958511',
//         gender: 'male',
//     }])
// })
router.get('/', EmployeeHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  EmployeeHandlers.findOne,
);
router.post(
  '/',
  validateRequest({
    body: Employee,
  }),
  EmployeeHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Employee,
  }),
  EmployeeHandlers.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  EmployeeHandlers.deleteOne,
);

export default router;