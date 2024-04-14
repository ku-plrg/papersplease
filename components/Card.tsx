import type { JSX } from "preact";
import { join } from "~/utils/class-join.ts";

export default function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      class={join(
        "w-full border border-border p-2 rounded overflow-x-auto bg-card",
        props.class,
      )}
    />
  );
}
