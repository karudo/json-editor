<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu :menu-items="objectMenuItems"/>
      { {{schema.properties.length}} }
    </div>
    <div class="children">
      <component v-for="(prop, idx) in schema.properties"
                 :key="prop.prop.num"
                 :is="`json-editor-${prop.prop.type}`"
                 :path="[...path, prop.key]"
                 :schema-path="[...schemaPath, idx]"
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
          divider: true
        },
        {
          title: 'Add prop',
          cb: () => this.schema.typeObject.addProp(this.schema.typeObject.length)
        }
      ]
    }
  },
  methods: {
    onChangeKey (idx, newKeyName) {
      this.schema.typeObject.changeKey(idx, newKeyName)
    }
  }
}
</script>

<style scoped>
.children {
  padding-left: 20px;
}
</style>
