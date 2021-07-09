import { Router } from "../deps.ts";
import {
  addTransformer,
  getTransformers,
} from "../controllers/transformerControllers.ts";
import { login, logout, signup } from "../controllers/authControllers.ts";

export const router = new Router();

router
  .get("/", getTransformers)
  .post("/", addTransformer)
  .post("/signup", signup)
  .post("/login", login)
  .get("/logout", logout);
