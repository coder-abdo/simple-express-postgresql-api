import { Request, Response, NextFunction } from 'express';
import { Error } from '../types/interfaces';
export const errorMiddleware = (
  err: Partial<Error>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = 500, message = 'something went wrong' } = err;
  res.status(status).json({ status, message });
};
