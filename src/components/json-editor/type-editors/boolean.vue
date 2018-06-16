<template>
  <div class="element boolean d-flex align-items-center">
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    <input type="checkbox" v-model="value">
    <span class="ml-2">{{strVal}}</span>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin],
  computed: {
    strVal () {
      return `${this.value}`
    }
  }
}
</script>
