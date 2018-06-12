import Vue from 'vue'
import _ from 'lodash'
import {floatVal} from './utils'

function createObjectProp (key, prop) {
  return {
    key,
    prop
  }
}

function createCtx (parent, item) {
  return {
    getPath: () => {
      const index = parent.getIdxForItem(item)
      return [...parent.ectx.getPath(), index]
    },
    getValue: (path) => parent.ectx.getValue(path),
    setValue: (path, value) => parent.ectx.setValue(path, value),
    deleteValue: (path) => parent.ectx.deleteValue(path)
  }
}

const SchemaTypeMixin = {
  data: () => {
    return {
      ectx: undefined
    }
  },
  methods: {
    getCtx () {
      return this.ectx
    },
    setCtx (ctx) {
      this.ectx = ctx
    },
    destroy () {
      if (this.beforeDestroy) {
        this.beforeDestroy()
      }
      this.ectx = undefined
      this.$destroy()
    },
    injectCtx (prop) {
      prop.setCtx(createCtx(this, prop))
    },
    getValue () {
      const p = this.ectx.getPath()
      return this.ectx.getValue(p)
    },
    deleteValue () {
      const p = this.ectx.getPath()
      return this.ectx.deleteValue(p)
    },
    setValue (val) {
      const p = this.ectx.getPath()
      this.ectx.setValue(p, val)
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
    getSubItem (idx) {
      return this.items[idx]
    },
    getJSONPathForSubItem (idx) {
      return idx
    },
    insert (idx, type = 'string') {
      const item = createSchemaItem(type)
      this.injectCtx(item)
      this.items.splice(idx, 0, item)

      const arr = this.getValue()
      arr.splice(idx, 0, '')
    },
    remove (idx) {
      this.items.splice(idx, 1)

      const arr = this.getValue()
      arr.splice(idx, 1)
    },
    getIdxForItem (schemaItem) {
      return this.items.findIndex(items => items === schemaItem)
    },
    beforeDestroy () {
      this.items.forEach(it => it.destroy())
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
  computed: {
    length () {
      return this.properties.length
    },
    error () {
      return this.properties.some(prop => prop.prop.error) && 'contains invalid properties'
    }
  },
  methods: {
    getSubItem (idx) {
      return this.properties[idx].prop
    },
    getJSONPathForSubItem (idx) {
      return this.properties[idx].key
    },
    changeKey (idx, key) {
      const oldKey = this.properties[idx].key
      if (key !== oldKey) {
        const value = this.properties[idx].prop.typeObject.getValue()
        this.properties[idx].prop.typeObject.deleteValue(value)
        this.properties[idx].key = key
        this.properties[idx].prop.typeObject.setValue(value)
      }
    },
    addProp (idx, type = 'string') {
      const prop = createSchemaItem(type)
      this.injectCtx(prop)
      this.properties.splice(idx, 0, createObjectProp('', prop))
      prop.typeObject.setValue('')
    },
    getIdxForItem (object) {
      return this.properties.findIndex(prop => prop.prop === object)
    },
    beforeDestroy () {
      this.properties.forEach(it => it.prop.destroy())
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

function convertValue (type, oldValue) {
  return typesCheckers[type].defValue(oldValue)
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
      const oldTypeObject = this.typeObject
      const oldValue = oldTypeObject.getValue()
      const newTypeObject = getTypeObjectByName(newType)
      newTypeObject.setCtx(oldTypeObject.getCtx())
      this.typeObject = newTypeObject
      this.typeObject.setValue(convertValue(newType, oldValue))
      oldTypeObject.destroy()
    },
    callMethod (method, ...args) {
      return this.typeObject[method](...args)
    },
    destroy () {
      this.typeObject.destroy()
      this.typeObject = undefined
      this.$destroy()
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
