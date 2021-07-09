import { bcrypt, Context, create, State } from "../deps.ts";
import { parseBody } from "../utils/parseBody.ts";
import { primes } from "../db.ts";
import { header, key, payload } from "../utils/jwt.ts";

export const signup = async (
  { state, request, response, cookies }: Context<State, Record<string, any>>,
) => {
  if (state.auth) {
    cookies.set("message", `You have already entered Cybertron`);
    response.redirect("/");
  } else {
    const body = await parseBody(request.body());
    console.log("signup: body is", body, ", state is", state);
    const find = await primes.findOne({ username: body.value.username });
    if (find) {
      cookies.set("message", "Prime already exists");
      response.redirect("/");
    } else {
      await primes.insertOne({
        username: body.value.username,
        password: await bcrypt.hash(body.value.password),
      });
      cookies.set(
        "message",
        `Successfully registered as a prime: ${body.value.username}. Enter Cybertron to continue..`,
      );
      response.redirect("/");
    }
  }
};

export const login = async (
  { state, request, response, cookies }: Context<State, Record<string, any>>,
) => {
  if (state.auth) {
    cookies.set("message", `You have already entered Cybertron`);
    response.redirect("/");
  } else {
    const body = await parseBody(request.body());
    console.log("login: body parsed is", body);
    const prime = await primes.findOne({ username: body.value.username });
    if (prime) {
      if (await bcrypt.compare(body.value.password, prime.password)) {
        response.body = prime.username;
        const payloadToken = { ...payload, username: body.value.username };
        const tok = { header, payloadToken, key };
        console.log("login: token data is: ", tok);
        const created = await create(header, payloadToken, key);
        console.log("login: created token is: ", created);
        cookies.set("token", created);
        cookies.set("message", "Successfully entered Cybertron");
        response.redirect("/");
      } else {
        cookies.set("message", "Wrong Password");
        response.redirect("/");
      }
    } else {
      cookies.set("message", "You are not registered as a prime");
      response.redirect("/");
    }
  }
};

export const logout = (
  { state, response, cookies }: Context<State, Record<string, any>>,
) => {
  if (state.auth) {
    cookies.set("token", "");
    cookies.set("message", "Successfully Logged Out");
    response.redirect("/");
  } else {
    cookies.set("message", "Please enter Cybertron");
    response.redirect("/");
  }
};
