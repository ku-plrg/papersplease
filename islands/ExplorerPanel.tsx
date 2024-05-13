import { computed, useSignal } from "@preact/signals";
import {
  labelCursorKey,
  labelled,
  labelMap,
  manifest,
} from "~/signals/state.ts";
import FileButton from "~/components/FileButton.tsx";
import Collapsible from "~/components/Collapsible.tsx";
import Card from "~/components/Card.tsx";
import { cursorKey } from "~/signals/state.ts";

export default function ExplorerPanel() {
  const type = useSignal("category");
  return (
    <Card class="h-full flex flex-col p-0">
      <div class="*:p-2 flex *:border-r *:border-border last:border-none border-b border-border">
        <button onClick={() => type.value = "category"}>
          Category
        </button>
        <button onClick={() => type.value = "label"}>
          Label
        </button>
      </div>
      <div class="overflow-x-scroll *:border-b *:border-border last:border-none">
        {type.value === "category" ? <CategoryView /> : <LabelView />}
      </div>
    </Card>
  );
}

function CategoryView() {
  return (
    <>
      {Object.entries(manifest.value.entries).map(([key, entries]) => (
        <Collapsible
          name="file-entries"
          key={key}
          keyName={key}
          summary={key}
          onToggle={(ev) => ev.currentTarget.open && (cursorKey.value = key)}
          unlabelledCount={computed(() =>
            entries.length - Object.keys(labelled.value).filter((k) =>
              entries.includes(k)
            )
              .length
          )}
          count={entries.length}
        >
          <div class="p-2">
            {entries.map((entry, idx) => (
              <FileButton key={idx} idx={idx} entry={entry} />
            ))}
          </div>
        </Collapsible>
      ))}
    </>
  );
}

function LabelView() {
  return (
    <>
      {Object.entries(labelMap.value).map(([label, entries]) => (
        <Collapsible
          name="file-entries"
          key={label}
          keyName={label}
          summary={label}
          onToggle={(ev) =>
            ev.currentTarget.open && (labelCursorKey.value = label)}
          count={entries.length}
        >
          <div class="p-2">
            {entries.map((entry, idx) => (
              <FileButton key={idx} idx={idx} entry={entry} />
            ))}
          </div>
        </Collapsible>
      ))}
    </>
  );
}
