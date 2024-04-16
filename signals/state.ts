import { computed, effect, signal } from "@preact/signals";
import { autoNextOption } from "./option.ts";

export const manifest = signal<Record<string, string[]>>({});
export const entryKeys = computed(() => Object.keys(manifest.value));
export const entryFiles = computed(() => Object.values(manifest.value).flat());

export const cursorKey = signal<string | undefined>(undefined);
export const cursorIdx = signal<number | undefined>(undefined);
export const cursorFiles = computed<string[]>(() =>
  cursorKey.value != null ? manifest.value[cursorKey.value] : []
);
export const cursorKeyIdx = computed<number | undefined>(() =>
  entryKeys.value.findIndex((key) => key === cursorKey.value)
);

export const currentFile = computed(() =>
  cursorIdx.value != null ? cursorFiles.value[cursorIdx.value] : undefined
);

export const labelled = signal<Record<string, string>>({});
export const labelMap = computed(() =>
  Object.groupBy(Object.entries(labelled.value), ([_, label]) => label)
);

effect(() => {
  // initialize cursor when cursorKey changed
  if (cursorFiles.value.length > 0) cursorIdx.value = 0;
});

export function goPrev() {
  if (cursorKey.value == null || cursorIdx.value == null) return;
  if (cursorIdx.value === 0) {
    const prevKeyIdx = cursorKeyIdx.value! - 1;
    if (prevKeyIdx < 0) return;
    cursorKey.value = entryKeys.value[prevKeyIdx];
    cursorIdx.value = cursorFiles.value.length - 1;
    return;
  }
  return cursorIdx.value = Math.max(cursorIdx.value - 1, 0);
}

export function goNext() {
  if (cursorKey.value == null || cursorIdx.value == null) return;
  if (cursorIdx.value === cursorFiles.value.length - 1) {
    const nextKeyIdx = cursorKeyIdx.value! + 1;
    if (nextKeyIdx >= entryKeys.value.length) return;
    return cursorKey.value = entryKeys.value[nextKeyIdx];
  }
  return cursorIdx.value = Math.min(
    cursorIdx.value + 1,
    entryFiles.value.length,
  );
}

export function setLabel(label: "bug" | "pass" | "idk") {
  if (currentFile.value == null) return;
  labelled.value = {
    ...labelled.value,
    [currentFile.value]: label,
  };
  console.log(autoNextOption.value);
  if (autoNextOption.value) goNext();
}
