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
export const entries = computed(() =>
  Object.entries(manifest.value.entries).flatMap(([k, vs]) =>
    vs.map((v) => [k, v])
  )
);

export const viewType = signal<"category" | "label">("category");

export const currentEntry = signal<string | undefined>(undefined);
export const listCursorKey = computed<string | undefined>(() =>
  entries.value.find(([k, v]) => v == currentEntry.value)?.[0]
);
export const listCursorIdx = computed<number | undefined>(() => {
  if (!listCursorKey.value) return;
  return manifest.value.entries[listCursorKey.value].findIndex((v) =>
    v == currentEntry.value
  );
});
export const listPrevEntry = computed<string | undefined>(() => {
  if (!listCursorKey.value || listCursorIdx.value == null) return;
  const currKeyIdx = entryKeys.value.findIndex((k) => listCursorKey.value == k);
  if (listCursorIdx.value == 0) {
    if (currKeyIdx <= 0) return;
    const prevKey = entryKeys.value[currKeyIdx - 1];
    return manifest.value.entries[prevKey].at(-1);
  }
  return manifest.value
    .entries[listCursorKey.value][Math.max(listCursorIdx.value - 1, 0)];
});
export const listNextEntry = computed<string | undefined>(() => {
  if (!listCursorKey.value || listCursorIdx.value == null) return;
  const currKeyIdx = entryKeys.value.findIndex((k) => listCursorKey.value == k);
  const listCursorEntries = manifest.value.entries[listCursorKey.value];
  if (listCursorIdx.value == listCursorEntries.length - 1) {
    if (currKeyIdx == entryKeys.value.length - 1) return;
    const nextKey = entryKeys.value[currKeyIdx + 1];
    return manifest.value.entries[nextKey][0];
  }
  return listCursorEntries[
    Math.min(listCursorIdx.value + 1, listCursorEntries.length - 1)
  ];
});

export const labelCursorKey = computed<string | undefined>(() => {
  if (!currentEntry.value) return;
  return labelled.value[currentEntry.value];
});
export const labelCursorIdx = computed<number | undefined>(() => {
  if (!labelCursorKey.value) return;
  return labelMap.value[labelCursorKey.value].findIndex((v) =>
    v === currentEntry.value
  );
});
export const labelPrevEntry = computed<string | undefined>(() => {
  if (!labelCursorKey.value || labelCursorIdx.value == null) return;
  const currKeyIdx = labels.value.findIndex((k) => labelCursorKey.value == k);
  if (labelCursorIdx.value == 0) {
    if (currKeyIdx <= 0) return;
    const prevKey = labels.value[currKeyIdx - 1];
    return labelMap.value[prevKey].at(-1);
  }
  return labelMap
    .value[labelCursorKey.value][Math.max(labelCursorIdx.value - 1, 0)];
});
export const labelNextEntry = computed<string | undefined>(() => {
  if (!labelCursorKey.value || labelCursorIdx.value == null) return;
  const currKeyIdx = labels.value.findIndex((k) => labelCursorKey.value == k);
  const listCursorEntries = labelMap.value[labelCursorKey.value];
  if (labelCursorIdx.value == listCursorEntries.length - 1) {
    if (currKeyIdx == labels.value.length - 1) return;
    const nextKey = labels.value[currKeyIdx + 1];
    return labelMap.value[nextKey][0];
  }
  return listCursorEntries[
    Math.min(labelCursorIdx.value + 1, listCursorEntries.length - 1)
  ];
});

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
    ...new Set([
      ...manifestLabels.value,
      ...Object.keys(manifestLabelMap.value),
      ...addedLabels.value,
    ]),
  ],
);

export function goPrev() {
  switch (viewType.value) {
    case "category":
      return currentEntry.value = listPrevEntry.value ?? currentEntry.value;
    case "label": {
      return currentEntry.value = labelPrevEntry.value ?? currentEntry.value;
    }
  }
}

export function goNext() {
  switch (viewType.value) {
    case "category":
      return currentEntry.value = listNextEntry.value ?? currentEntry.value;
    case "label":
      return currentEntry.value = labelNextEntry.value ?? currentEntry.value;
  }
}

export function setLabel(label: string) {
  if (currentEntry.value == null) return;
  // save entry for when updating label on label view
  const entry = currentEntry.value;
  if (autoNextOption.value) goNext();
  updatedLabelled.value = {
    ...updatedLabelled.value,
    [entry]: label,
  };
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
