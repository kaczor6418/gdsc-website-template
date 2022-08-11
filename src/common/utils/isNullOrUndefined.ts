/**
 *
 * @param value any value you want to check is it a null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value == null;
}
