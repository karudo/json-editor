import _ from 'lodash'

const typesCheckers = {
  number: _.isNumber,
  string: _.isString,
  object: _.isPlainObject,
  array: _.isArray,
  boolean: _.isBoolean,
  null: _.isNull
}

const types = Object.keys(typesCheckers)

function getType (value) {
  return types.find(tn => typesCheckers[tn](value))
}

export function getEditorSchema (json) {
  const type = getType(json)
  const schema = {type}
  if (type === 'array') {
    schema.items = json.map(item => getEditorSchema(item))
  }
  if (type === 'object') {
    schema.props = _.map(json, (prop, key) => ({
      key,
      ...getEditorSchema(prop)
    }))
  }
  return schema
}
