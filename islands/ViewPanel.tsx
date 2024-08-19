import { type Signal, useSignal, useSignalEffect } from "@preact/signals";
import { codeToHtml } from "shiki";
import { currentEntry, FileType } from "~/signals/state.ts";
import Card from "~/components/Card.tsx";

interface PanelProps {
  filename: string;
  lang: FileType;
}

export default function ViewPanel({ filename, lang }: PanelProps) {
  const body = useSignal("");
  useSignalEffect(() =>
    void (async () => {
      if (!currentEntry.value) return;
      const res = await fetch(
        new URL(`/api/file/${currentEntry.value}/${filename}`, import.meta.url),
      );
      if (res.ok) {
        const json = await res.json();
        body.value = await codeToHtml(json.text, {
          lang,
          theme: "vitesse-black",
        });
      }
    })()
  );
  if (!currentEntry.value) {
    return <Card class="h-full">No content</Card>;
  }
  return (
    <Card>
      <div class="flex">
        <div class="min-w-24">{filename}</div>
        <button
          onClick={() =>
            navigator.clipboard.writeText(extractCodeFromHtml(body.value))}
        >
          Copy Code
        </button>
      </div>
      <div
        class="overflow-auto"
        dangerouslySetInnerHTML={{ __html: body.value }}
      />
    </Card>
  );
}

function extractCodeFromHtml(htmlString: string): string {
  // Create a DOM parser
  const parser = new DOMParser();
  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, "text/html");
  // Select the code element within the pre element
  const codeElement = doc.querySelector("pre code");
  // Extract and return the text content
  return codeElement?.textContent ?? "";
}
