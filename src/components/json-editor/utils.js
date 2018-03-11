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
    if (wrappedSchema.typeName === 'array') {
      wrappedSchema = wrappedSchema.typeObject.items[idx]
    } else if (wrappedSchema.typeName === 'object') {
      wrappedSchema = wrappedSchema.typeObject.properties[idx].prop
    }
  }
  return wrappedSchema
}

export function getValuePathPySchemaPath (wrappedSchema, schemaPath) {
  const path = []
  for (const idx of schemaPath) {
    if (wrappedSchema.typeName === 'array') {
      wrappedSchema = wrappedSchema.typeObject.items[idx]
      path.push(idx)
    } else if (wrappedSchema.typeName === 'object') {
      const prop = wrappedSchema.typeObject.properties[idx]
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
