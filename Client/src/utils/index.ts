export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key);
}

export function setSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value);
}
