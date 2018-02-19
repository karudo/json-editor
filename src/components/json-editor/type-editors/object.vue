<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu
        :schema="schema"
      ></json-editor-props-menu>
      { {{schema.props.length}} }
    </div>
    <div class="childrens">
      <component v-for="(prop, idx) in schema.props"
                 :key="prop.key"
                 :is="`json-editor-${prop.type}`"
                 :schema="prop"
                 v-model="value[prop.key]"
      >
        <editable-span slot="name" :value="prop.key" @change="onChangeKey(idx, $event)"/>
      </component>
    </div>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin],
  methods: {
    onChangeKey (idx, newKeyName) {
      const oldKeyName = this.schema.props[idx].key
      this.$set(this.value, newKeyName, this.value[oldKeyName])
      this.schema.props[idx].key = newKeyName
      this.$delete(this.value, oldKeyName)
    }
  }
}
</script>

<style scoped>
.childrens {
  padding-left: 20px;
}
</style>
