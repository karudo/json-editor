<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu :menu-items="arrayMenuItems"/>
      [ {{schema.items.length}} ]
    </div>
    <div class="children">
      <component v-for="(item, idx) in schema.items"
                 :is="`json-editor-${item.type}`"
                 :key="`${idx}-${item.num}`"
                 :path="[...path, idx]"
                 :schema-path="[...schemaPath, idx]"
                 :parent-menu-items="getSubmenuItems(idx)"
      >
        <span slot="name">{{idx}}</span>
      </component>
    </div>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
import {vuexModuleName} from '../constants'
export default {
  mixins: [EditorMixin],
  computed: {
    arrayMenuItems () {
      return [
        ...this.menuItems,
        {
          divider: true
        },
        {
          title: 'Add element',
          cb: () => this.insert(this.schema.items.length)
        }
      ]
    }
  },
  methods: {
    insert (idx) {
      this.schema.typeObject.insert(idx)
    },
    remove (idx) {
      this.$store.commit(`${vuexModuleName}/arrayRemoveElement`, {
        id: this.jsonEditor.schemaId,
        path: this.schemaPath,
        idx
      })
      this.jsonEditor.arrayRemoveElement(this.path, idx)
    },
    getSubmenuItems (idx) {
      return [{
        divider: true
      }, {
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
