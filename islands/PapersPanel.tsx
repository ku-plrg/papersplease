import type { JSX } from "preact";
import { PaperButton } from "../components/PaperButton.tsx";
import Card from "~/components/Card.tsx";
import { join } from "~/utils/class-join.ts";
import {
  addedLabels,
  currentEntry,
  labels,
  setLabel,
} from "~/signals/state.ts";
import { useComputed, useSignal } from "@preact/signals";
import Checkbox from "~/components/Checkbox.tsx";
import { autoNextOption } from "~/signals/option.ts";
import Input from "~/components/Input.tsx";

export default function PapersPanel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const tagValue = useSignal("");
  const disabled = useComputed(() => currentEntry.value == null);
  return (
    <Card class={join("p-4 flex flex-col gap-4", props.class)}>
      <div class="flex justify-between">
        <Checkbox
          onInput={() => autoNextOption.value = !autoNextOption.value}
        >
          Go next after label
        </Checkbox>
        <div class="flex gap-4">
          <Input
            value={tagValue}
            onInput={(ev) => tagValue.value = ev.currentTarget.value}
            placeholder="Label name"
          />
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shrink-0 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            onClick={() => {
              if (tagValue.value) {
                const value = tagValue.value;
                tagValue.value = "";
                addedLabels.value = [...addedLabels.value, value];
              }
            }}
          >
            Add label
          </button>
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        {labels.value.map((label) => (
          <PaperButton
            key={label}
            disabled={disabled}
            size="lg"
            variant="bug"
            onClick={() => setLabel(label)}
          >
            {label}
          </PaperButton>
        ))}
      </div>
    </Card>
  );
}
