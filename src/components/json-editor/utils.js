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

export function getSchemaByPath (schema, path) {
  for (const idx of path) {
    if (schema.type === 'array') {
      schema = schema.items[idx]
    } else if (schema.type === 'object') {
      schema = schema.props[idx].schema
    }
  }
  return schema
}

/*
export function vueAssign (source, update) {
  const keys = Object.keys(update)
  for (const key of keys) {
    Vue.set(source, key, update[key])
  }
}
*/
