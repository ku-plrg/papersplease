import { type Signal, useSignal, useSignalEffect } from "@preact/signals";
import { codeToHtml } from "shiki";
import { currentEntry, FileType } from "~/signals/state.ts";
import Card from "~/components/Card.tsx";

interface PanelProps {
  filename: string;
  lang: FileType;
}

interface Entry {
  code: string;
  html: string;
}

export default function ViewPanel({ filename, lang }: PanelProps) {
  const entry = useSignal<Entry | null>(null);
  useSignalEffect(() =>
    void (async () => {
      if (!currentEntry.value) return;
      const res = await fetch(
        new URL(`/api/file/${currentEntry.value}/${filename}`, import.meta.url),
      );
      if (res.ok) {
        const json = await res.json();
        entry.value = {
          code: json.text,
          html: await codeToHtml(json.text, {
            lang,
            theme: "vitesse-black",
          }),
        };
      }
    })()
  );
  if (!currentEntry.value || !entry.value) {
    return <Card class="h-full">No content</Card>;
  }
  return (
    <Card>
      <div class="flex">
        <div class="min-w-24">{filename}</div>
        <button
          onClick={() => navigator.clipboard.writeText(entry.value!.code)}
        >
          Copy Code
        </button>
      </div>
      <div
        class="overflow-auto"
        dangerouslySetInnerHTML={{ __html: entry.value.html }}
      />
    </Card>
  );
}
