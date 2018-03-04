<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu :menu-items="arrayMenuItems"/>
      [ {{schema.schema.items.length}} ]
    </div>
    <div class="children">
      <component v-for="(item, idx) in schema.schema.items"
                 :is="`json-editor-${item.type}`"
                 :key="`${idx}-${item.num}`"
                 :path="[...path, idx]"
                 :schema-path="[...schemaPath, idx]"
                 :schema="item"
                 :value="value[idx]"
                 :parent-menu-items="getSubmenuItems(idx)"
      >
        <span slot="name">{{idx}}</span>
      </component>
    </div>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin],
  computed: {
    arrayMenuItems () {
      return [
        ...this.menuItems,
        {
          divided: true,
          title: 'Add element',
          cb: () => this.insert(this.schema.schema.items.length)
        }
      ]
    }
  },
  methods: {
    insert (idx) {
      this.jsonEditor.insert(this.schemaPath, idx)
    },
    remove (idx) {
      this.jsonEditor.remove(this.schemaPath, idx)
    },
    getSubmenuItems (idx) {
      return [{
        divided: true,
        title: 'Insert before',
        cb: () => this.insert(idx)
      }, {
        title: 'Insert after',
        cb: () => this.insert(idx + 1)
      }, {
        title: 'Remove',
        cb: () => this.remove(idx)
      }]
    }
  }
}
</script>

<style scoped>
.children {
  padding-left: 20px;
}
</style>
