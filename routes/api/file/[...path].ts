import { Handlers } from "$fresh/server.ts";
import { join } from "@std/path/join.ts";

export const handler: Handlers = {
  async GET(_req, { params: { path } }) {
    const text = await Deno.readTextFile(join(path));
    return Response.json({ text });
  },
};
