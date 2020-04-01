export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function ascii(str) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[^\x00-\x7F]/g, "");
}
