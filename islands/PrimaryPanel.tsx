import { useSignalEffect } from "@preact/signals";
import { manifest } from "~/signals/state.ts";
import FileButton from "~/components/FileButton.tsx";
import Collapsible from "~/components/Collapsible.tsx";
import Card from "~/components/Card.tsx";
import { cursorKey } from "~/signals/state.ts";

export default function PrimaryPanel() {
  useSignalEffect(() =>
    void (async () => {
      const res = await fetch(new URL("/api/manifest", import.meta.url));
      if (res.ok) {
        const json = await res.json();
        manifest.value = json.manifest;
      }
    })()
  );
  return (
    <Card class="h-full *:border-b *:border-border last:border-none">
      {Object.entries(manifest.value).map(([key, entries]) => (
        <Collapsible
          name="file-entries"
          key={key}
          keyName={key}
          summary={key}
          onToggle={(ev) => ev.currentTarget.open && (cursorKey.value = key)}
          count={entries.length}
        >
          <div class="p-2">
            {entries.map((entry, idx) => (
              <FileButton key={idx} idx={idx} entry={entry} />
            ))}
          </div>
        </Collapsible>
      ))}
    </Card>
  );
}
