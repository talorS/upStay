import { Request, Response, NextFunction } from 'express';
import httpStatusCodes from 'http-status-codes';
import { z } from 'zod';

export const validateRequest =
  (schema: z.ZodTypeAny) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error) {
        let err = error;
        if (err instanceof z.ZodError) {
          err = err.issues.map((e) => ({ path: e.path.join('->'), message: e.message }));
        }
        return res.status(httpStatusCodes.CONFLICT).json({
          status: 'failed',
          error: err,
        });
      }
    };

