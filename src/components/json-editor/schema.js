import _ from 'lodash'
import {floatVal} from '@/components/json-editor/utils'

const typesCheckers = {
  number: {
    checker: _.isNumber,
    defValue: floatVal
  },
  string: {
    checker: _.isString,
    defValue (oldVal) {
      return (_.isString(oldVal) || _.isNumber(oldVal) || _.isBoolean(oldVal)) ? `${oldVal}` : ''
    }
  },
  object: {
    checker: _.isPlainObject,
    defValue: () => ({})
  },
  array: {
    checker: _.isArray,
    defValue: () => ([])
  },
  boolean: {
    checker: _.isBoolean,
    defValue: oldVal => !!oldVal
  },
  null: {
    checker: _.isNull,
    defValue: () => null
  }
}

export const typesNames = Object.keys(typesCheckers)

function detectTypeName (value) {
  return typesNames.find(tn => typesCheckers[tn].checker(value)) || 'string'
}

let num = 0
export function createSchemaItem (type, options) {
  return {
    num: ++num,
    type,
    ...options
  }
}

export function getEditorSchema (json) {
  const type = detectTypeName(json)
  let schema
  switch (type) {
    case 'array':
      schema = createSchemaItem(type, {
        items: json.map(item => getEditorSchema(item))
      })
      break
    case 'object':
      schema = createSchemaItem(type, {
        properties: _.map(json, (prop, key) => ({
          key,
          prop: getEditorSchema(prop)
        }))
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
    if (schema.type === 'array') {
      schema = schema.items[idx]
    } else if (schema.type === 'object') {
      schema = schema.properties[idx].prop
    }
  }
  return schema
}
