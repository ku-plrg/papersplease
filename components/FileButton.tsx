import { useComputed, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";
import { currentEntry, labelled } from "~/signals/state.ts";
import { join } from "~/utils/class-join.ts";

interface FileButtonProps {
  entry: string;
}
export default function FileButton({ entry }: FileButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const flag = useComputed(() => currentEntry.value === entry);
  const label = useComputed(() => labelled.value[entry]);
  useSignalEffect(() => {
    if (flag.value) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  return (
    <button
      ref={ref}
      class={join(
        "w-full flex items-center justify-between",
        flag.value ? "text-foreground" : "text-muted-foreground",
      )}
      onClick={() => currentEntry.value = entry}
    >
      <p>{flag.value ? <b>{entry}</b> : entry}</p>
      {label.value && label.value}
    </button>
  );
}
