// import Vue from 'vue'
import _ from 'lodash'
import {floatVal} from './utils'

/*
function createDisplayValue (prop = 'value') {
  return {
    get () {
      return this[prop]
    },
    set (v) {
      this[prop] = v
    }
  }
}

const BooleanSchema = Vue.extend({
  data () {
    const {value = false} = this.$options
    return {
      type: 'boolean',
      value: value,
      error: undefined
    }
  },
  computed: {
    displayValue: createDisplayValue()
  }
})

const NullSchema = Vue.extend({
  data () {
    return {
      type: 'null',
      value: null,
      error: undefined
    }
  }
})

const StringSchema = Vue.extend({
  data () {
    const {value = ''} = this.$options
    return {
      type: 'string',
      value: value,
      error: undefined
    }
  },
  computed: {
    displayValue: createDisplayValue()
  }
})

const NumberSchema = Vue.extend({
  data () {
    const {value = 0} = this.$options
    return {
      type: 'number',
      value: value,
      stringValue: `${value}`
    }
  },
  computed: {
    displayValue: createDisplayValue('stringValue'),
    isInvalidNumber () {
      const num = Number(this.stringValue)
      return isNaN(num)
    },
    error () {
      return this.isInvalidNumber && 'invalid number'
    }
  },
  watch: {
    stringValue (newVal) {
      if (!this.isInvalidNumber) {
        this.value = Number(newVal)
      }
    }
  }
})

const ArraySchema = Vue.extend({
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
// */

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
    defValue: (oldVal) => Boolean(oldVal)
  },
  null: {
    checker: _.isNull,
    defValue: () => null
  }
}

const types = Object.keys(typesCheckers)

function getType (value) {
  return types.find(tn => typesCheckers[tn].checker(value))
}

let num = 0
export function getEmptySchema (type) {
  return {
    num: num++,
    type,
    error: false,
    items: [],
    props: []
  }
}

export function convertValue (type, oldValue) {
  return typesCheckers[type].defValue(oldValue)
}

export function getEditorSchema (json) {
  const type = getType(json)
  const schema = getEmptySchema(type)
  if (type === 'array') {
    schema.items = json.map(item => getEditorSchema(item))
  }
  if (type === 'object') {
    schema.props = _.map(json, (prop, key) => ({
      key,
      error: false,
      schema: getEditorSchema(prop)
    }))
  }
  return schema
}
