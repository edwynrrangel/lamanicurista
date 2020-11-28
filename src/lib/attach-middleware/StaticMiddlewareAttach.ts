import { dir } from "console";
import { Application } from "express";

type Wrapper = (app: Application, dirname?: string) => void;

export class StaticHandler {
  constructor(
    private middleware: Wrapper[],
    private app: Application,
    private dirname?: string
  ) {}

  public apply() {
    for (const f of this.middleware) {
      f(this.app, this.dirname);
    }
  }
}
