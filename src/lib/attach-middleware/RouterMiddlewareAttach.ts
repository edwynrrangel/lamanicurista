import { Application, NextFunction, Request, Response } from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

interface Route {
  path: string;
  method: string;
  handler: Handler | Handler[];
}

export class RouterHandler {
  constructor(private routes: Route[], private app: Application) {}

  public apply() {
    for (const route of this.routes) {
      const { method, path, handler } = route;
      this.app[method](`/api/v1/${path}`, handler);
    }
  }
}
