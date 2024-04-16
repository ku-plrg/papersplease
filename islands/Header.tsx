import Card from "~/components/Card.tsx";
import { Download, Upload } from "lucide-preact";
import { labelled, labelMap, manifest } from "~/signals/state.ts";
import { entryFiles } from "~/signals/state.ts";

export default function Header() {
  return (
    <Card>
      <div class="w-full flex justify-between">
        <div>
          bug ({labelMap.value.bug?.length ?? 0}) / pass
          ({labelMap.value.pass?.length ?? 0}) / idk
          ({labelMap.value.idk?.length ?? 0}) / unresolved
          ({entryFiles.value.length - Object.keys(
            labelled.value,
          ).length})
        </div>
        <div class="flex gap-4">
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
          <div
            onDrop={async (ev) => {
              ev.preventDefault();
              if (ev.dataTransfer?.items) {
                const item = [...ev.dataTransfer.items][0];
                const file = item.getAsFile();
                if (!file) return;
                const text = new TextDecoder().decode(await file.arrayBuffer());
                const json = JSON.parse(text);
                labelled.value = json;
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
                  labelled.value = json;
                });
                input.click();
              }}
            >
              <Upload />
              <span>upload label</span>
            </button>
          </div>
          <div>
            <button
              class="flex gap-2 hover:bg-muted p-2 rounded-md"
              onClick={() => {
                const href = URL.createObjectURL(
                  new Blob([JSON.stringify(labelMap.value, null, 2)]),
                );
                const a = document.createElement("a");
                a.href = href;
                a.download = "label.json";
                a.click();
              }}
            >
              <Download />
              <span>download label</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
