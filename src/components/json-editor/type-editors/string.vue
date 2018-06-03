<template>
  <div class="d-inline-flex align-items-start">
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    <b-input-group size="sm" :append="`${cValue.length}`">
      <b-form-input type="text" v-model="cValue" placeholder=""></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>

<style scoped>
.value {
  color: green;
}
</style>
