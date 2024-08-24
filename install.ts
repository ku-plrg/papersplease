import $ from "jsr:@david/dax";

async function main() {
  const dirname = import.meta.dirname;
  if (!dirname) return;
  await $`deno run -A --watch=${dirname}/static/,${dirname}/routes/ --import-map=${dirname}/deno.json ${dirname}/dev.ts`;
}

if (import.meta.main) await main();
