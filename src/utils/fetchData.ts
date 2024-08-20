import wretch from 'wretch';

import { jsonServerUrl } from './constants';

export async function fetchData(url: string) {
  if (!url) url = jsonServerUrl;
  const response = await wretch(url).get().json();
  return response;
}
