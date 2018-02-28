import Vue from 'vue'
import _ from 'lodash'
import {floatVal} from './utils'

const Schema = Vue.extend({
  methods: {
    toJSON () {
      return {
        type: this.type,
        error: this.error,
        items: this.items,
        props: this.props
      }
    }
  }
})

const BooleanSchema = Schema.extend({
  data () {
    return {
      type: 'boolean',
      error: undefined
    }
  }
})

const NullSchema = Schema.extend({
  data () {
    return {
      type: 'null',
      error: undefined
    }
  }
})

const StringSchema = Schema.extend({
  data () {
    return {
      type: 'string',
      error: undefined
    }
  }
})

const NumberSchema = Schema.extend({
  data () {
    return {
      type: 'number',
      error: undefined
    }
  }
})

const ArraySchema = Schema.extend({
  data () {
    const {items = []} = this.$options
    return {
      type: 'array',
      items: items
    }
  },
  computed: {
    error () {
      return this.items.some(item => item.error) && 'contains invalid items'
    }
  }
})

const ObjectSchema = Schema.extend({
  data () {
    const {props = []} = this.$options
    return {
      type: 'object',
      props: props
    }
  },
  computed: {
    error () {
      return this.props.some(prop => prop.schema.error) && 'contains invalid props'
    }
  }
})

const typesCheckers = {
  number: {
    checker: _.isNumber,
    defValue: floatVal,
    Class: NumberSchema
  },
  string: {
    checker: _.isString,
    defValue (oldVal) {
      return (_.isString(oldVal) || _.isNumber(oldVal) || _.isBoolean(oldVal)) ? `${oldVal}` : ''
    },
    Class: StringSchema
  },
  object: {
    checker: _.isPlainObject,
    defValue: () => ({}),
    Class: ObjectSchema
  },
  array: {
    checker: _.isArray,
    defValue: () => ([]),
    Class: ArraySchema
  },
  boolean: {
    checker: _.isBoolean,
    defValue: (oldVal) => Boolean(oldVal),
    Class: BooleanSchema
  },
  null: {
    checker: _.isNull,
    defValue: () => null,
    Class: NullSchema
  }
}

const types = Object.keys(typesCheckers)

function getType (value) {
  return types.find(tn => typesCheckers[tn].checker(value))
}

let num = 0
export function getSchemaForType (type, data) {
  return new typesCheckers[type].Class({
    data: {
      num: num++,
      ...data
    }
  })
}

const SchemaWrapper = Vue.extend({
  data () {

  },
  computed: {
    type () {
      return this.schema.type
    }
  }
})

export function convertValue (type, oldValue) {
  return typesCheckers[type].defValue(oldValue)
}

export function getEditorSchema (json) {
  const type = getType(json)
  let schema
  switch (type) {
    case 'array':
      schema = getSchemaForType('array', {
        items: json.map(item => getEditorSchema(item))
      })
      break
    case 'object':
      schema = getSchemaForType('object', {
        props: _.map(json, (prop, key) => ({
          key,
          error: undefined,
          schema: getEditorSchema(prop)
        }))
      })
      break
    default:
      schema = getSchemaForType(type)
  }
  return schema
}
