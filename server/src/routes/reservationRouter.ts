import express, { NextFunction, Request, Response } from "express";
import httpStatusCodes from 'http-status-codes';
import { getReservations, getReservationsV2 } from '@controller/reservationBL';
import { validateRequest } from "@middleware/validator";
import generateToken from "@controller/authBL";
import { LimitSchema } from "@models/schema";
import authGuard from "@middleware/authJWT";

const router = express.Router();

router
  .get("/reservations",
    validateRequest(LimitSchema),
    authGuard,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { query: { page, limit } } = LimitSchema.parse({ query: req.query });
        const resp = await getReservations(page, limit);
        res.status(httpStatusCodes.OK).json(resp);
      } catch (err) {
        console.log(err)
        const error = err as Error;
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(new Error(error.message));
      }
    });

router
  .get("/reservationsV2",
    validateRequest(LimitSchema),
    authGuard,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { query: { page, limit } } = LimitSchema.parse({ query: req.query });
        const resp = await getReservationsV2(page, limit);
        res.status(httpStatusCodes.OK).json(resp);
      } catch (err) {
        console.log(err)
        const error = err as Error;
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(new Error(error.message));
      }
    });

//get the access token
router
  .get("/token", (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = generateToken();
      res.status(httpStatusCodes.OK).json({ token });
    } catch (err) {
      const error = err as Error;
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(new Error(error.message));
    }
  });

export default router;