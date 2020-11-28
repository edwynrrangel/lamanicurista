import { Application, NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../lib/ErrorHandler";

const handleError = (app: Application) => {
  app.use(
    (err: ErrorHandler, req: Request, resp: Response, next: NextFunction) => {
      const { message, statusCode } = err;
      resp.status(statusCode).json({
        status: "error",
        statusCode,
        message,
      });
    }
  );
};

export default [handleError];
