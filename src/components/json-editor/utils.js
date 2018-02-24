export function floatVal (v) {
  v = parseFloat(v)
  return isNaN(v) ? 0 : v
}
