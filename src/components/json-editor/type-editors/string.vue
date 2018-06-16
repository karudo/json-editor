<template>
  <div class="element string d-flex align-items-center">
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    <b-input-group size="sm" :append="`${value.length}`">
      <b-form-input type="text" v-model="value" placeholder=""></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>
