<template>
  <div class="element object ">
    <div class="element d-flex align-items-center">
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
                 :parent-menu-items="getSubmenuItems(idx)"
      >
        <object-prop-name slot="name"
                          :name="prop.key"
                          :props="allProps"
                          @change="changeKey(idx, $event)"
        />
      </component>
    </div>
    <modal-name-editor ref="modal" :names="allProps" @change="addProp"/>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
import {vuexModuleName} from '../constants'
import ObjectPropName from './object-prop-name'
import ModalNameEditor from './modal-name-editor'
export default {
  components: {ObjectPropName, ModalNameEditor},
  mixins: [EditorMixin],
  computed: {
    allProps () {
      return this.schema.properties.map(p => p.key)
    },
    objectMenuItems () {
      return [
        ...this.menuItems,
        {
          divider: true
        },
        {
          title: 'Add prop',
          cb: () => this.$refs.modal.show()
        }
      ]
    }
  },
  methods: {
    addProp (name) {
      this.$store.commit(`${vuexModuleName}/objectAddProp`, {
        id: this.jsonEditor.schemaId,
        path: this.schemaPath,
        name,
        type: 'string'
      })
      this.jsonEditor.objectAddProp(this.path, name, '')
    },
    changeKey (idx, newName) {
      const oldName = this.schema.properties[idx].key
      this.$store.commit(`${vuexModuleName}/objectChangeKey`, {
        id: this.jsonEditor.schemaId,
        path: this.schemaPath,
        idx,
        newName
      })
      this.jsonEditor.objectChangeKey(this.path, oldName, newName)
    },
    remove (idx) {
      const name = this.schema.properties[idx].key
      this.$store.commit(`${vuexModuleName}/objectRemoveProp`, {
        id: this.jsonEditor.schemaId,
        path: this.schemaPath,
        idx
      })
      this.jsonEditor.objectRemoveProp(this.path, name)
    },
    getSubmenuItems (idx) {
      return [{
        divider: true
      }, {
        title: 'Remove',
        cb: () => this.remove(idx)
      }]
    }
  }
}
</script>
