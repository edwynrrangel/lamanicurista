import { AuthController } from "../controllers/auth/AuthController";
import { AppController } from "../controllers/admin/AppController";
import PassportGoogle from "../lib/google/PassportGoogle";

export default [
  {
    path: "auth/login",
    method: "post",
    handler: AuthController.login,
  },
  {
    path: "auth/google/callback",
    method: "get",
    handler: AuthController.login,
  },
  {
    path: "admin/apps",
    method: "get",
    handler: [PassportGoogle.handlingToVerifyToken, AppController.index],
  },
  {
    path: "admin/apps",
    method: "post",
    handler: [PassportGoogle.handlingToVerifyToken, AppController.create],
  }
];
