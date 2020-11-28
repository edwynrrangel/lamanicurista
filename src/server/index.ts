import express, { Application } from "express";

import config from "../config/server";
import { OauthGoogle } from "../lib/google/OauthGoogle";
import { RouterHandler } from "../lib/attach-middleware/RouterMiddlewareAttach";
import routes from "../router";
import { CommonHandler } from "../lib/attach-middleware/CommonMiddlewareAttach";
import commonMiddleware from "../middlewares/commonMiddleware";
import errorMiddleware from "../middlewares/errorMiddleware";
import { PassportHandler } from "../lib/attach-middleware/PassportMiddlewareAttach";
import passportMiddleware from "../middlewares/passportMiddleware";
import { StaticHandler } from "../lib/attach-middleware/StaticMiddlewareAttach";
import staticMiddleware from "../middlewares/staticMiddleware";
import { EventHandler } from "../lib/attach-middleware/EventMiddlewareAttach";
import subscriptions from "../subscriptions";

export default class Server {
  public app: Application;
  private commonHandler: CommonHandler;
  private passportHandler: PassportHandler;
  private router: RouterHandler;
  private staticHandler: StaticHandler;
  private errorHandler: CommonHandler;
  private subscriptions: EventHandler;

  constructor(private dirRoot?: string) {
    this.app = express();
    this.commonHandler = new CommonHandler(commonMiddleware, this.app);
    this.passportHandler = new PassportHandler(passportMiddleware);
    this.router = new RouterHandler(routes, this.app);
    this.staticHandler = new StaticHandler(
      staticMiddleware,
      this.app,
      this.dirRoot
    );
    this.errorHandler = new CommonHandler(errorMiddleware, this.app);
    this.subscriptions = new EventHandler(subscriptions, this.app);
    this.config();
  }

  config() {
    this.app.set("port", config.port || 3000);
    OauthGoogle.init();
    this.commonHandler.apply();
    this.passportHandler.apply();
    this.router.apply();
    this.staticHandler.apply();
    this.errorHandler.apply();
    this.subscriptions.apply();
  }

  async start(): Promise<any> {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${this.app.get(
          "port"
        )}`
      );
    });
  }
}
