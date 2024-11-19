export function verifyIsObject(value: string) {
  try {
    return Boolean(JSON.parse(value));
  } catch {
    return false;
  }
}
