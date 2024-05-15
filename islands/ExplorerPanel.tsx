import { computed } from "@preact/signals";
import {
  currentEntry,
  labelCursorKey,
  labelled,
  labelMap,
  listCursorKey,
  manifest,
  viewType,
} from "~/signals/state.ts";
import FileButton from "~/components/FileButton.tsx";
import Collapsible from "~/components/Collapsible.tsx";
import Card from "~/components/Card.tsx";

export default function ExplorerPanel() {
  return (
    <Card class="h-full flex flex-col p-0">
      <div class="*:p-2 flex *:border-r *:border-border last:border-none border-b border-border">
        <button
          class={viewType.value === "category" ? "bg-muted" : ""}
          onClick={() => viewType.value = "category"}
        >
          Category
        </button>
        <button
          class={viewType.value === "label" ? "bg-muted" : ""}
          onClick={() => viewType.value = "label"}
        >
          Label
        </button>
      </div>
      <div class="overflow-x-scroll *:border-b *:border-border last:border-none">
        {viewType.value === "category" ? <CategoryView /> : <LabelView />}
      </div>
    </Card>
  );
}

function CategoryView() {
  return (
    <>
      {Object.entries(manifest.value.entries).map(([key, entries]) => (
        <Collapsible
          key={key}
          open={computed(() => key === listCursorKey.value)}
          summary={key}
          onToggle={(ev) => {
            if (!ev.currentTarget.open || currentEntry.value) return;
            currentEntry.value = entries[0];
          }}
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
              <FileButton
                key={idx}
                entry={entry}
              />
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
          key={label}
          summary={label}
          onToggle={(ev) => {
            if (!ev.currentTarget.open || currentEntry.value) return;
            currentEntry.value = entries[0];
          }}
          open={computed(() => label === labelCursorKey.value)}
          count={entries.length}
        >
          <div class="p-2">
            {entries.map((entry, idx) => (
              <FileButton
                key={idx}
                entry={entry}
              />
            ))}
          </div>
        </Collapsible>
      ))}
    </>
  );
}
