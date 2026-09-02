export function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function cleanString(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}
