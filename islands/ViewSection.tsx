import { viewFiles } from "~/signals/state.ts";
import ViewPanel from "~/islands/ViewPanel.tsx";

export default function ViewSection() {
  return (
    <div class="h-full grid grid-flow-row gap-4 min-h-0">
      {viewFiles.value.map(([name, { type }]) => {
        return <ViewPanel key={name} filename={name} lang={type} />;
      })}
    </div>
  );
}
