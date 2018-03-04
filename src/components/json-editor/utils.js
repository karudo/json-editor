export function floatVal (v) {
  v = parseFloat(v)
  return isNaN(v) ? 0 : v
}

export function getValueByPath (obj, path) {
  for (const key of path) {
    obj = obj[key]
  }
  return obj
}

export function getSchemaByPath (wrappedSchema, path) {
  for (const idx of path) {
    if (wrappedSchema.type === 'array') {
      wrappedSchema = wrappedSchema.schema.items[idx]
    } else if (wrappedSchema.type === 'object') {
      wrappedSchema = wrappedSchema.schema.props[idx].prop
    }
  }
  return wrappedSchema
}

export function getValuePathPySchemaPath (wrappedSchema, schemaPath) {
  const path = []
  for (const idx of schemaPath) {
    if (wrappedSchema.type === 'array') {
      wrappedSchema = wrappedSchema.schema.items[idx]
      path.push(idx)
    } else if (wrappedSchema.type === 'object') {
      const prop = wrappedSchema.schema.props[idx]
      wrappedSchema = prop.prop
      path.push(prop.key)
    }
  }
  return path
}

/*
export function vueAssign (source, update) {
  const keys = Object.keys(update)
  for (const key of keys) {
    Vue.set(source, key, update[key])
  }
}
*/
