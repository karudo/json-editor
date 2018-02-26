<template>
  <div>
    <div>
      <slot name="name"></slot>
      <json-editor-props-menu :menu-items="menuItems"/>
      [ {{schema.items.length}} ]
    </div>
    <div class="childrens">
      <component v-for="(item, idx) in schema.items"
                 :is="`json-editor-${item.type}`"
                 :key="`${idx}-${item.num}`"
                 :path="[...path, idx]"
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
import {symbolObjectEditor} from '../symbols'
export default {
  mixins: [EditorMixin],
  provide () {
    return {
      [symbolObjectEditor]: {
        addItem: () => {
          this.schema.items.push(this.getEmptySchema('string'))
          this.jsonEditor.addItem(this.path, '')
        }
      }
    }
  },
  computed: {
    arrayMenuItems () {
      return [
        ...this.menuItems,
        {
          divided: true,
          title: 'Add item',
          cb: this.addItem
        }
      ]
    }
  },
  methods: {
    addItem () {
      this.schema.items.push(this.getEmptySchema('string'))
      this.jsonEditor.addItem(this.path, '')
    },
    insert (idx) {
      this.schema.items.splice(idx, 0, this.getEmptySchema('string'))
      this.jsonEditor.insert(this.path, idx, '')
    },
    getSubmenuItems (idx) {
      return [{
        divided: true,
        title: 'Insert before',
        cb: () => this.insert(idx)
      }, {
        title: 'Insert after',
        cb: () => this.insert(idx + 1)
      }]
    }
  }
}
</script>

<style scoped>
.childrens {
  padding-left: 20px;
}
</style>
