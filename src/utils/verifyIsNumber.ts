export function verifyIsNumber(value: string) {
  const regex = new RegExp(/^\d+$/);

  return regex.test(value);
}
