<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu :menu-items="objectMenuItems"/>
      { {{schema.schema.props.length}} }
    </div>
    <div class="children">
      <component v-for="(prop, idx) in schema.schema.props"
                 :path="[...path, prop.key]"
                 :schema-path="[...schemaPath, idx]"
                 :key="prop.key"
                 :is="`json-editor-${prop.prop.type}`"
                 :schema="prop.prop"
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
  computed: {
    objectMenuItems () {
      return [
        ...this.menuItems,
        {
          divided: true,
          title: 'Add prop',
          cb: () => this.jsonEditor.addProp(this.schemaPath, this.schema.schema.props.length)
        }
      ]
    }
  },
  methods: {
    onChangeKey (idx, newKeyName) {
      const oldKeyName = this.schema.schema.props[idx].key
      if (newKeyName !== oldKeyName) {
        this.jsonEditor.changeKey(this.schemaPath, idx, newKeyName)
      }
    }
  }
}
</script>

<style scoped>
.children {
  padding-left: 20px;
}
</style>
