<template>
  <div class="element number d-flex align-items-start">
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    <b-input-group size="sm">
      <b-form-input type="text" v-model.number="value" placeholder=""></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>
