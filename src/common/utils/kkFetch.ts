import { KKFetchResponse } from '../types';

export async function kkFetch<T = Record<PropertyKey, unknown>>(url: string): Promise<KKFetchResponse<T>> {
  const res = await fetch(url);
  if (!res.ok) {
    // TODO: Implement failed fetch
    console.info(`Couldn't fetch data`);
  }
  return res;
}
