import { autobots, decepticons } from "../db.ts";
import { handle } from "../utils/handlebars.js";
import { parseBody } from "../utils/parseBody.ts";
import { Context, State } from "../deps.ts";
export const getTransformers = async (
  { state, request, response, cookies }: Context<State, Record<string, any>>,
) => {
  const message = cookies.get("message");
  if (message) {
    cookies.set("message", "");
  }
  const autobotsAll = await autobots.findMany();
  const decepticonsAll = await decepticons.findMany();
  const renderObject = {
    autobots: autobotsAll,
    decepticons: decepticonsAll,
    request: request,
    message: message,
    state: state,
  };
  response.body = await handle.renderView("list", renderObject);
};

export const addTransformer = async (
  { state, request, response, cookies }: Context<State, Record<string, any>>,
) => {
  if (state.auth) {
    const body = await parseBody(request.body());
    const transformerCollection = `${body.value.type}` === "autobot"
      ? autobots
      : decepticons;
    const auto = await autobots.findOne({ name: body.value.name });
    const dece = await decepticons.findOne({ name: body.value.name });
    if (auto || dece) {
      cookies.set("message", `Transformer ${body.value.name} Already exists`);
      response.redirect("/");
    } else {
      await transformerCollection.insertOne({
        name: body.value.name,
        image: body.value.image,
      });
      cookies.set(
        "message",
        `Successfully created ${body.value.type} ${body.value.name}`,
      );
      response.redirect("/");
    }
  } else {
    cookies.set("message", "Please confirm your identity as a prime");
    response.redirect("/");
  }
};
