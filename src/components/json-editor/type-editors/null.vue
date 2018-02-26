<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    null
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>
