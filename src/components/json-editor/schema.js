import Vue from 'vue'
import _ from 'lodash'
import {floatVal} from './utils'

function createObjectProp (key, prop) {
  return {
    key,
    prop
  }
}

const SchemaMixin = {
  data: () => {
    return {
      ectx: undefined
    }
  },
  methods: {
    detach () {
      this.ectx = undefined
      this.$destroy()
    },
    toJSON () {
      return {
        type: this.type,
        error: this.error,
        items: this.items,
        properties: this.properties
      }
    }
  }
}

const BooleanSchema = Vue.extend({
  mixins: [SchemaMixin],
  data () {
    return {
      type: 'boolean',
      error: undefined
    }
  }
})

const NullSchema = Vue.extend({
  mixins: [SchemaMixin],
  data () {
    return {
      type: 'null',
      error: undefined
    }
  }
})

const StringSchema = Vue.extend({
  mixins: [SchemaMixin],
  data () {
    return {
      type: 'string',
      error: undefined
    }
  }
})

const NumberSchema = Vue.extend({
  mixins: [SchemaMixin],
  data () {
    return {
      type: 'number',
      error: undefined
    }
  }
})

const ArraySchema = Vue.extend({
  mixins: [SchemaMixin],
  data () {
    const {items = []} = this.$options
    items.forEach(item => this.injectCtx(item))
    return {
      type: 'array',
      items: items
    }
  },
  methods: {
    insert (idx, type = 'string') {
      const item = createSchemaItem(type)
      this.injectCtx(item)
      this.items.splice(idx, 0, item)
    },
    remove (idx) {
      this.items.splice(idx, 1)
    },
    injectCtx (schemaItem) {
      schemaItem.ectx = {
        getPath: () => {
          const index = this.items.findIndex(items => items === schemaItem)
          return [...this.ectx.getPath(), index]
        },
        setValue: (...args) => this.ectx.setValue(...args)
      }
    }
  },
  computed: {
    error () {
      return this.items.some(item => item.error) && 'contains invalid items'
    }
  }
})

const ObjectSchema = Vue.extend({
  mixins: [SchemaMixin],
  data () {
    const {properties = []} = this.$options
    return {
      type: 'object',
      properties: properties.map(({key, prop}) => {
        this.injectCtx(prop)
        return createObjectProp(key, prop)
      })
    }
  },
  methods: {
    changeKey (idx, key) {
      this.properties[idx].key = key
    },
    addProp (idx, type = 'string') {
      const prop = createSchemaItem(type)
      this.injectCtx(prop)
      this.properties.splice(idx, 0, createObjectProp('', prop))
    },
    injectCtx (schemaItem) {
      schemaItem.ectx = {
        getPath: () => {
          const index = this.properties.findIndex(prop => prop.prop === schemaItem)
          return [...this.ectx.getPath(), index]
        },
        setValue: (...args) => this.ectx.setValue(...args)
      }
    }
  },
  computed: {
    error () {
      return this.properties.some(prop => prop.prop.error) && 'contains invalid properties'
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

function detectType (value) {
  return types.find(tn => typesCheckers[tn].checker(value))
}

let num = 0
export function getSchemaForType (type, options) {
  return new typesCheckers[type].Class({
    data: {
      num: num++
    },
    ...options
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

function createSchemaItem (type, options) {
  const schema = getSchemaForType(type, options)
  return new SchemaWrapper({
    data: {schema}
  })
}

export function convertValue (type, oldValue) {
  return typesCheckers[type].defValue(oldValue)
}

export function getEditorSchema (json) {
  const type = detectType(json)
  let schema
  switch (type) {
    case 'array':
      schema = createSchemaItem(type, {
        items: json.map(item => getEditorSchema(item))
      })
      break
    case 'object':
      schema = createSchemaItem(type, {
        properties: _.map(json, (prop, key) => ({key, prop: getEditorSchema(prop)}))
      })
      break
    default:
      schema = createSchemaItem(type)
  }
  return schema
}
