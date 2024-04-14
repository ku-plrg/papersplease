import { type Signal, useSignal, useSignalEffect } from "@preact/signals";
import { codeToHtml } from "shiki";
import { currentFile } from "../signals/state.ts";
import Card from "~/components/Card.tsx";

interface PanelProps {
  filename: string;
}

export default function Panel({ filename }: PanelProps) {
  const body = useSignal("");
  useSignalEffect(() =>
    void (async () => {
      if (!currentFile.value) return;
      const res = await fetch(
        new URL(`/api/file/${currentFile.value}/${filename}`, import.meta.url),
      );
      if (res.ok) {
        const json = await res.json();
        body.value = await codeToHtml(json.text, {
          lang: "javascript",
          theme: "vitesse-black",
        });
      }
    })()
  );
  if (!currentFile.value) {
    return <Card class="h-full">No content</Card>;
  }
  return (
    <Card>
      <div>{filename}</div>
      <div
        class="overflow-auto"
        dangerouslySetInnerHTML={{ __html: body.value }}
      />
    </Card>
  );
}
