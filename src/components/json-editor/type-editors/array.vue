<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu
        :schema="schema"
      />
      [ {{schema.items.length}} ]
    </div>
    <div class="childrens">
      <component v-for="(item, idx) in schema.items"
                 :path="[...path, idx]"
                 :key="item.key"
                 :is="`json-editor-${item.type}`"
                 :schema="item"
                 :value="value[idx]"
      >
        <span slot="name">{{idx}}</span>
      </component>
    </div>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>

<style scoped>
.childrens {
  padding-left: 20px;
}
</style>
