import Card from "~/components/Card.tsx";
import { Download } from "lucide-preact";
import { labelled, labelMap } from "~/signals/state.ts";
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
        <div class="flex">
          <button
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
          </button>
        </div>
      </div>
    </Card>
  );
}
