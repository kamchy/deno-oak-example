import { Context, Payload, State, verify } from "../deps.ts";
import { header, key } from "../utils/jwt.ts";

export const validate = async (
  { state, cookies }: Context<State, Record<string, any>>,
  next: () => Promise<unknown> | unknown,
) => {
  const token = cookies.get("token");
  console.log(`validate: token : ${token} key=${key}`);
  if (token) {
    const result: Payload = await verify(token, key, header.alg);
    if (result) {
      state.auth = true;
      state.username = result.username;
    }
  }
  await next();
};
