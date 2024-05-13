import { useSignalEffect } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { labels, manifest, setLabel } from "~/signals/state.ts";
import { currentFile } from "~/signals/state.ts";
import { goNext, goPrev } from "~/signals/state.ts";

export function Register() {
  useEffect(() => {
    const stored = localStorage.getItem("recent-manifest");
    if (!stored) return;
    manifest.value = JSON.parse(stored);
    console.log("auto loaded recent manifest from localStorage");
  }, []);
  useSignalEffect(() => {
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
    function listener(ev: KeyboardEvent) {
      if (document.activeElement?.tagName == "INPUT") return;
      switch (ev.key) {
        case "ArrowLeft":
          return goPrev();
        case "ArrowRight":
          return goNext();
      }
    }
  });
  useSignalEffect(() => {
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
    function listener(ev: KeyboardEvent) {
      if (currentFile.value == null) return;
      if (document.activeElement?.tagName == "INPUT") return;
      switch (ev.key) {
        case "q":
          return labels.value[0] && setLabel(labels.value[0]);
        case "w":
          return labels.value[1] && setLabel(labels.value[1]);
        case "e":
          return labels.value[2] && setLabel(labels.value[2]);
        case "r":
          return labels.value[3] && setLabel(labels.value[3]);
      }
    }
  });
  return <></>;
}
