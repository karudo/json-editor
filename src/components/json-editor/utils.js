export function floatVal (v) {
  v = parseFloat(v)
  return isNaN(v) ? 0 : v
}

export function getByPath (obj, path) {
  for (const key of path) {
    obj = obj[key]
  }
  return obj
}

/*
export function vueAssign (source, update) {
  const keys = Object.keys(update)
  for (const key of keys) {
    Vue.set(source, key, update[key])
  }
}
*/
