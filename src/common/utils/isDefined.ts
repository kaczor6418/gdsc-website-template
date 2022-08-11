/**
 *
 * @param value any value you want to check is it defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}
