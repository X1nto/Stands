export function parseQuery(url: string): URLSearchParams {
  const queryString = url.substring(url.lastIndexOf('?') + 1);
  return new URLSearchParams(queryString);
}
