import type { JSX } from "preact";
import { twMerge } from "tailwind-merge";

export function join(
  ...args: (string | JSX.SignalLike<string | undefined> | undefined | false)[]
) {
  return twMerge(args.filter(Boolean).join(" "));
}
