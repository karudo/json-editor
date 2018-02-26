<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    <editable-span v-model="sValue" class="number"/>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
import {floatVal} from '../utils'
export default {
  mixins: [EditorMixin],
  computed: {
    sValue: {
      get () {
        return `${this.cValue}`
      },
      set (v) {
        this.cValue = floatVal(v)
      }
    }
  }
}
</script>

<style scoped>
.number {
  color: blue;
}
</style>
