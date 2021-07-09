import { Database } from "https://deno.land/x/aloedb/mod.ts";

interface User {
  username: string;
  password: string;
}
interface Transformer {
  name: string;
  image: string;
}

export const autobots = new Database<Transformer>("./db/autobots.json");
export const decepticons = new Database<Transformer>("./db/decepticons.json");
export const primes = new Database<User>("./db/primes.json");
