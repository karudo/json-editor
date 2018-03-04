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
  methods: {
    insert (idx, type = 'string') {
      this.items.splice(idx, 0, createSchemaItem(type))
    },
    remove (idx) {
      this.items.splice(idx, 1)
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
  methods: {
    changeKey (idx, key) {
      this.props[idx].key = key
    }
  },
  computed: {
    error () {
      return this.props.some(prop => prop.prop.error) && 'contains invalid props'
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
  computed: {
    type () {
      return this.schema.type
    }
  },
  methods: {
    changeType (newType) {
      this.schema = getSchemaForType(newType)
    },
    callMethod (method, ...args) {
      return this.schema[method](...args)
    },
    toJSON () {
      return {
        type: this.type,
        schema: this.schema
      }
    }
  }
})

function createSchemaItem (type, data) {
  const schema = getSchemaForType(type, data)
  return new SchemaWrapper({
    data: {schema}
  })
}

export function convertValue (type, oldValue) {
  return typesCheckers[type].defValue(oldValue)
}

export function getEditorSchema (json) {
  const type = getType(json)
  let schema
  switch (type) {
    case 'array':
      schema = createSchemaItem(type, {
        items: json.map(item => getEditorSchema(item))
      })
      break
    case 'object':
      schema = createSchemaItem(type, {
        props: _.map(json, (prop, key) => ({
          key,
          error: undefined,
          prop: getEditorSchema(prop)
        }))
      })
      break
    default:
      schema = createSchemaItem(type)
  }
  return schema
}
