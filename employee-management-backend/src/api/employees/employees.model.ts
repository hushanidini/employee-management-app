import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Employee = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  number: z.string().max(12),
  gender: z.string().max(1),
});

export type Employee = z.infer<typeof Employee>;
export type EmployeeWithId = WithId<Employee>;
export const Employees = db.collection<Employee>('employees');