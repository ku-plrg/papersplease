import { ReadonlySignal, useComputed } from "@preact/signals";
import { JSX } from "preact";
import { join } from "~/utils/class-join.ts";

interface CollapsibleProps extends JSX.HTMLAttributes<HTMLDetailsElement> {
  summary: string;
  open: ReadonlySignal<boolean>;
  unlabelledCount?: ReadonlySignal<number>;
  count: number;
}

export default function Collapsible(
  {
    onToggle,
    unlabelledCount,
    open,
    count,
    summary,
    children,
    ...props
  }: CollapsibleProps,
) {
  return (
    <details {...props} open={open} onToggle={onToggle}>
      <summary class="hover:bg-muted p-2 px-3 rounded-md cursor-pointer flex justify-between sticky top-0">
        <p class="break-all">
          {summary}
        </p>
        {unlabelledCount
          ? (
            <p class="ml-2 rounded-full border border-border self-start flex overflow-hidden flex-shrink-0">
              <div
                class={join(
                  "px-2 border-r border-border",
                  unlabelledCount.value ? "bg-orange-500" : "bg-green-500",
                )}
              >
                {unlabelledCount}
              </div>
              <div class="px-2">{count}</div>
            </p>
          )
          : (
            <p class="ml-2 px-2 rounded-full border border-border self-start">
              {count}
            </p>
          )}
      </summary>
      {children}
    </details>
  );
}
