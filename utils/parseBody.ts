import { Body } from "../deps.ts";

export const parseBody = async (body: Body) => {
  const tempBodyValue: Record<string, string> = {};
  console.log("parseBody: body is", body);
  if (body.type === "form") {
    const val = await body.value;
    console.log(`val awaited: ${val}`);
    for (const [key, value] of val) {
      console.log(`key ${key} val ${value}`);
      tempBodyValue[key] = value;
    }
  }
  const ret = { ...body, value: tempBodyValue };
  console.log(`parsed body:`, ret);
  return ret;
};
