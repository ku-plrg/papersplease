import { useSignalEffect } from "@preact/signals";
import { setLabel } from "~/signals/state.ts";
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
          return setLabel("bug");
        case "w":
          return setLabel("pass");
        case "e":
          return setLabel("idk");
      }
    }
  });
  return <></>;
}
