import Card from "~/components/Card.tsx";
import { Download, RefreshCcw, Upload } from "lucide-preact";
import {
  buildManifest,
  labelled,
  labelMap,
  labels,
  manifest,
  updatedLabelled,
} from "~/signals/state.ts";
import { entryFiles } from "~/signals/state.ts";

export default function Header() {
  return (
    <Card>
      <div class="w-full flex items-center justify-between">
        <div class="flex flex-wrap items-center">
          {labels.value.map((label) => (
            <div class="border-r border-border px-2" key={label}>
              {label} ({labelMap.value[label]?.length ?? 0})
            </div>
          ))}
          <div class="px-2">
            unresolved ({entryFiles.value.length - Object.keys(
              labelled.value,
            ).length})
          </div>
        </div>
        <div class="flex gap-4">
          <div>
            <button
              class="flex gap-2 hover:bg-muted p-2 rounded-md"
              onClick={() => {
                localStorage.setItem(
                  "recent-manifest",
                  JSON.stringify(buildManifest()),
                );
              }}
            >
              <RefreshCcw />
            </button>
          </div>
          <div
            onDrop={async (ev) => {
              ev.preventDefault();
              if (ev.dataTransfer?.items) {
                const item = [...ev.dataTransfer.items][0];
                const file = item.getAsFile();
                if (!file) return;
                const text = new TextDecoder().decode(await file.arrayBuffer());
                const json = JSON.parse(text);
                manifest.value = json;
              }
            }}
          >
            <button
              class="flex gap-2 hover:bg-muted p-2 rounded-md"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.addEventListener("change", async () => {
                  if (!input.files) return;
                  const text = new TextDecoder().decode(
                    await input.files[0].arrayBuffer(),
                  );
                  const json = JSON.parse(text);
                  manifest.value = json;
                });
                input.click();
              }}
            >
              <Upload />
              <span>upload manifest</span>
            </button>
          </div>
          <div>
            <button
              class="flex gap-2 hover:bg-muted p-2 rounded-md"
              onClick={() => {
                const href = URL.createObjectURL(
                  new Blob([JSON.stringify(buildManifest(), null, 2)]),
                );
                const a = document.createElement("a");
                a.href = href;
                a.download = "manifest.json";
                a.click();
              }}
            >
              <Download />
              <span>download manifest</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
