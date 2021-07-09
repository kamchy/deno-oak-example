import { getNumericDate, Header, Payload } from "../deps.ts";

export const key = "your-secret";

export const payload: Payload = {
  exp: getNumericDate(new Date().getTime() + 60000 * 60),
};

export const header: Header = {
  alg: "HS512",
  typ: "JWT",
};
