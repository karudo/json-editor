import _ from 'lodash'

const tnNumber = 'number'
const tnString = 'string'
const tnObject = 'object'
const tnArray = 'array'
const tnBoolean = 'boolean'
const tnNull = 'null'

export function floatVal (v) {
  v = parseFloat(v)
  return isNaN(v) ? 0 : v
}

export const typesCheckers = {
  [tnNumber]: {
    checker: _.isNumber,
    defValue: floatVal
  },
  [tnString]: {
    checker: _.isString,
    defValue (oldVal) {
      return (_.isString(oldVal) || _.isNumber(oldVal) || _.isBoolean(oldVal)) ? `${oldVal}` : ''
    }
  },
  [tnObject]: {
    checker: _.isPlainObject,
    defValue: () => ({}),
    defOptions: () => ({properties: []})
  },
  [tnArray]: {
    checker: _.isArray,
    defValue: () => ([]),
    defOptions: () => ({items: []})
  },
  [tnBoolean]: {
    checker: _.isBoolean,
    defValue: oldVal => !!oldVal
  },
  [tnNull]: {
    checker: _.isNull,
    defValue: () => null
  }
}

export const typesNames = [tnNumber, tnString, tnObject, tnArray, tnBoolean, tnNull]

function detectTypeName (value) {
  return typesNames.find(tn => typesCheckers[tn].checker(value)) || tnString
}

let num = 0
export function createSchemaItem (type, options) {
  return {
    num: ++num,
    type,
    ...(typesCheckers[type].defOptions && typesCheckers[type].defOptions()),
    ...options
  }
}
export function createObjectProp (key, prop) {
  return {
    key,
    keyEdit: false,
    prop
  }
}

export function getEditorSchema (json) {
  const type = detectTypeName(json)
  let schema
  switch (type) {
    case tnArray:
      schema = createSchemaItem(type, {
        items: json.map(item => getEditorSchema(item))
      })
      break
    case tnObject:
      schema = createSchemaItem(type, {
        properties: _.map(json, (prop, key) => createObjectProp(key, getEditorSchema(prop)))
      })
      break
    default:
      schema = createSchemaItem(type)
  }
  return schema
}

let vuid = 0
export function generateVuexID () {
  return `i${vuid++}`
}

export function getValueByPath (obj, path) {
  for (const key of path) {
    obj = obj[key]
  }
  return obj
}

export function getSchemaByPath (schema, path) {
  for (const idx of path) {
    if (schema.type === tnArray) {
      schema = schema.items[idx]
    } else if (schema.type === tnObject) {
      schema = schema.properties[idx].prop
    }
  }
  return schema
}
