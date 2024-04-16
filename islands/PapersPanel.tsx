import type { JSX } from "preact";
import { PaperButton } from "../components/PaperButton.tsx";
import Card from "~/components/Card.tsx";
import { join } from "~/utils/class-join.ts";
import { currentFile } from "~/signals/state.ts";
import { useComputed } from "@preact/signals";
import Checkbox from "~/components/Checkbox.tsx";
import { autoNextOption } from "~/signals/option.ts";

export default function PapersPanel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const disabled = useComputed(() => currentFile.value == null);
  return (
    <Card class={join("p-4 flex flex-col gap-4", props.class)}>
      <div>
        <Checkbox
          onInput={() => autoNextOption.value = !autoNextOption.value}
        >
          Go next after label
        </Checkbox>
      </div>
      <div class="grid grid-flow-col gap-4">
        <PaperButton disabled={disabled} size="lg" variant="bug">
          Bug (Q)
        </PaperButton>
        <PaperButton disabled={disabled} size="lg" variant="pass">
          Pass (W)
        </PaperButton>
        <PaperButton disabled={disabled} size="lg" variant="idk">
          I don't know (E)
        </PaperButton>
      </div>
    </Card>
  );
}
