import { ReadonlySignal, useComputed } from "@preact/signals";
import { JSX } from "preact";
import { cursorKey } from "~/signals/state.ts";
import { join } from "~/utils/class-join.ts";

interface CollapsibleProps extends JSX.HTMLAttributes<HTMLDetailsElement> {
  keyName: string;
  summary: string;
  unlabelledCount?: ReadonlySignal<number>;
  count: number;
}

export default function Collapsible(
  { onToggle, keyName, unlabelledCount, count, summary, children, ...props }:
    CollapsibleProps,
) {
  const open = useComputed(() => cursorKey.value === keyName);
  return (
    <details {...props} open={open} onToggle={onToggle}>
      <summary class="hover:bg-muted p-2 px-3 rounded-md cursor-pointer flex justify-between sticky top-0">
        <p class="break-all">
          {summary}
        </p>
        {unlabelledCount
          ? (
            <p class="ml-2 rounded-full opacity-50 border self-start flex overflow-hidden flex-shrink-0">
              <div
                class={join(
                  "px-2 border-r",
                  unlabelledCount.value ? "bg-orange-500" : "bg-green-500",
                )}
              >
                {unlabelledCount}
              </div>
              <div class="px-2">{count}</div>
            </p>
          )
          : (
            <p class="ml-2 px-2 rounded-full opacity-50 border self-start">
              {count}
            </p>
          )}
      </summary>
      {children}
    </details>
  );
}
