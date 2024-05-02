import { useSignalEffect } from "@preact/signals";
import { labels, setLabel } from "~/signals/state.ts";
import { labelled } from "~/signals/state.ts";
import { currentFile, cursorKeyIdx } from "~/signals/state.ts";
import { goNext, goPrev } from "~/signals/state.ts";

export function Register() {
  useSignalEffect(() => {
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
    function listener(ev: KeyboardEvent) {
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
