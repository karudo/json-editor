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
    wrappedSchema = wrappedSchema.typeObject.getSubItem(idx)
  }
  return wrappedSchema
}

export function getValuePathPySchemaPath (wrappedSchema, schemaPath) {
  const path = []
  for (const idx of schemaPath) {
    path.push(wrappedSchema.typeObject.getJSONPathForSubItem(idx))
    wrappedSchema = wrappedSchema.typeObject.getSubItem(idx)
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
