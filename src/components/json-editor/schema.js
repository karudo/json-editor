import Vue from 'vue'
import _ from 'lodash'
import {floatVal} from './utils'

function createObjectProp (key, prop) {
  return {
    key,
    prop
  }
}

const SchemaTypeMixin = {
  data: () => {
    return {
      ectx: undefined
    }
  },
  methods: {
    setCtx (ctx) {
      this.ectx = ctx
    },
    destroy () {
      this.ectx = undefined
      this.$destroy()
    },
    toJSON () {
      return {
        typeName: this.typeName,
        error: this.error,
        items: this.items,
        properties: this.properties
      }
    }
  }
}

const SchemaTypeBoolean = Vue.extend({
  mixins: [SchemaTypeMixin],
  data () {
    return {
      typeName: 'boolean',
      error: undefined
    }
  }
})

const SchemaTypeNull = Vue.extend({
  mixins: [SchemaTypeMixin],
  data () {
    return {
      typeName: 'null',
      error: undefined
    }
  }
})

const SchemaTypeString = Vue.extend({
  mixins: [SchemaTypeMixin],
  data () {
    return {
      typeName: 'string',
      error: undefined
    }
  }
})

const SchemaTypeNumber = Vue.extend({
  mixins: [SchemaTypeMixin],
  data () {
    return {
      typeName: 'number',
      error: undefined
    }
  }
})

const SchemaTypeArray = Vue.extend({
  mixins: [SchemaTypeMixin],
  data () {
    const {items = []} = this.$options
    items.forEach(item => this.injectCtx(item))
    return {
      typeName: 'array',
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
      schemaItem.setCtx({
        getPath: () => {
          const index = this.items.findIndex(items => items === schemaItem)
          return [...this.ectx.getPath(), index]
        },
        setValue: (...args) => this.ectx.setValue(...args)
      })
    }
  },
  computed: {
    error () {
      return this.items.some(item => item.error) && 'contains invalid items'
    }
  }
})

const SchemaTypeObject = Vue.extend({
  mixins: [SchemaTypeMixin],
  data () {
    const {properties = []} = this.$options
    return {
      typeName: 'object',
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
    injectCtx (prop) {
      prop.setCtx({
        getPath: () => {
          const index = this.properties.findIndex(prop => prop.prop === prop)
          return [...this.ectx.getPath(), index]
        },
        setValue: (...args) => this.ectx.setValue(...args)
      })
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
    Class: SchemaTypeNumber
  },
  string: {
    checker: _.isString,
    defValue (oldVal) {
      return (_.isString(oldVal) || _.isNumber(oldVal) || _.isBoolean(oldVal)) ? `${oldVal}` : ''
    },
    Class: SchemaTypeString
  },
  object: {
    checker: _.isPlainObject,
    defValue: () => ({}),
    Class: SchemaTypeObject
  },
  array: {
    checker: _.isArray,
    defValue: () => ([]),
    Class: SchemaTypeArray
  },
  boolean: {
    checker: _.isBoolean,
    defValue: (oldVal) => Boolean(oldVal),
    Class: SchemaTypeBoolean
  },
  null: {
    checker: _.isNull,
    defValue: () => null,
    Class: SchemaTypeNull
  }
}

const types = Object.keys(typesCheckers)

function detectTypeName (value) {
  return types.find(tn => typesCheckers[tn].checker(value))
}

let num = 0
export function getTypeObjectByName (typeName, options) {
  return new typesCheckers[typeName].Class({
    data: {
      num: num++
    },
    ...options
  })
}

const SchemaTypeWrapper = Vue.extend({
  computed: {
    typeName () {
      return this.typeObject.typeName
    }
  },
  methods: {
    changeType (newType) {
      this.schema = getTypeObjectByName(newType)
    },
    callMethod (method, ...args) {
      return this.typeObject[method](...args)
    },
    setCtx (ctx) {
      this.typeObject.setCtx(ctx)
    },
    toJSON () {
      return {
        typeName: this.typeName,
        typeObject: this.typeObject
      }
    }
  }
})

function createSchemaItem (type, options) {
  const typeObject = getTypeObjectByName(type, options)
  return new SchemaTypeWrapper({
    data: {typeObject}
  })
}

export function convertValue (type, oldValue) {
  return typesCheckers[type].defValue(oldValue)
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
        properties: _.map(json, (prop, key) => ({key, prop: getEditorSchema(prop)}))
      })
      break
    default:
      schema = createSchemaItem(type)
  }
  return schema
}
