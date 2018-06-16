<template>
  <div class="element object">
    <div class="element d-flex">
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
        <span class="prop-name" slot="name">
          {{prop.key}}
        </span>
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
