import { isDefined } from './isDefined';

export function isObject<T = Record<PropertyKey, unknown>>(value: unknown): value is T {
  return isDefined(value) && value === 'object';
}
