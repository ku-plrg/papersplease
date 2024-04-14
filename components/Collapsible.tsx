import { useComputed, useSignal } from "@preact/signals";
import { JSX } from "preact";
import { cursorKey } from "~/signals/state.ts";

interface CollapsibleProps extends JSX.HTMLAttributes<HTMLDetailsElement> {
  keyName: string;
  summary: string;
  count: number;
}

export default function Collapsible(
  { onToggle, keyName, count, summary, children, ...props }: CollapsibleProps,
) {
  const open = useComputed(() => cursorKey.value === keyName);
  return (
    <details {...props} open={open} onToggle={onToggle}>
      <summary class="hover:bg-muted p-2 px-3 rounded-md cursor-pointer flex justify-between">
        <p class="break-all">
          {summary}
        </p>
        <p class="ml-2 px-2 rounded-full opacity-50 border self-start">
          {count}
        </p>
      </summary>
      {children}
    </details>
  );
}
