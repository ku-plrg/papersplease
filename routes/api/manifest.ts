import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req) {
    const result = await Deno.readTextFile("./240410_18_56.json");
    return Response.json({ manifest: JSON.parse(result) });
  },
};
