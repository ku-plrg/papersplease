import { computed, effect, signal } from "@preact/signals";
import { autoNextOption } from "./option.ts";

export type FileType = "plaintext" | "javascript";
type FileView = [string, { type: FileType }];
interface LabelInfo {
  backgroundColor?: string;
}
interface Manifest {
  entries: Record<string, string[]>;
  labelled: Record<string, string[]>;
  files: FileView[];
  labels: Record<string, LabelInfo>;
}
const INIT_MANIFEST = {
  entries: {},
  labelled: {},
  files: [],
  labels: {},
} satisfies Manifest;
export const manifest = signal<Manifest>(INIT_MANIFEST);
export const viewFiles = computed<FileView[]>(() => manifest.value.files);

export const entryKeys = computed(() => Object.keys(manifest.value.entries));
export const entryFiles = computed(() =>
  Object.values(manifest.value.entries).flat()
);

export const cursorKey = signal<string | undefined>(undefined);
export const cursorIdx = signal<number | undefined>(undefined);
export const cursorFiles = computed<string[]>(() =>
  cursorKey.value != null ? manifest.value.entries[cursorKey.value] : []
);
export const cursorKeyIdx = computed<number | undefined>(() =>
  entryKeys.value.findIndex((key) => key === cursorKey.value)
);

export const labelCursorKey = signal<string | undefined>(undefined);

export const currentFile = computed(() =>
  cursorIdx.value != null ? cursorFiles.value[cursorIdx.value] : undefined
);

export const manifestLabels = computed<string[]>(() =>
  Object.keys(manifest.value.labels)
);
export const addedLabels = signal<string[]>([]);
export const manifestLabelMap = computed(() => manifest.value.labelled);
export const manifestLabelled = computed<Record<string, string>>(() =>
  Object.fromEntries(
    Object.entries(manifestLabelMap.value).flatMap(([tag, entries]) =>
      entries.map((e) => [e, tag])
    ),
  )
);
export const updatedLabelled = signal<Record<string, string>>({});
export const labelled = computed(() => ({
  ...manifestLabelled.value,
  ...updatedLabelled.value,
}));
export const labelMap = computed(() =>
  Object.fromEntries(
    Object.entries(
      Object.groupBy(Object.entries(labelled.value), ([_, label]) => label),
    ).map(([key, vs]) => [key, vs?.map((p) => p[0]) ?? []]),
  )
);
export const labels = computed<string[]>(
  () => [
    ...new Set([...Object.keys(manifestLabelMap.value), ...addedLabels.value]),
  ],
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

export function setLabel(label: string) {
  if (currentFile.value == null) return;
  updatedLabelled.value = {
    ...updatedLabelled.value,
    [currentFile.value]: label,
  };
  if (autoNextOption.value) goNext();
}

export function buildManifest() {
  return {
    entries: manifest.value.entries,
    files: manifest.value.files,
    labels: {
      ...manifest.value.labels,
      ...Object.fromEntries(addedLabels.value.map((k) => [k, {}])),
    },
    labelled: labelMap.value,
  } satisfies Manifest;
}
