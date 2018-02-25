<template>
  <span style="cursor: pointer">
    :
    <el-dropdown trigger="click"
                 :show-timeout="100"
                 @command="handleCommand"
    >
      <span class="el-dropdown-link"><i class="el-icon-setting"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="t in types"
                          :key="t.key"
                          :command="t.key"
                          :class="schema.type === t.key && 'selected-item'"
        >
          {{t.title}}
        </el-dropdown-item>
        <el-dropdown-item command="addItem" divided>
          Add item
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    :
  </span>
</template>

<script>
import {symbolTypeEditor, symbolObjectEditor} from './symbols'
export default {
  props: {
    schema: {
      type: null
    },
    extraItems: {
      type: Array,
      default: () => []
    }
  },
  inject: {
    typeEditor: {
      from: symbolTypeEditor
    },
    objectEditor: {
      from: symbolObjectEditor,
      default: 0
    }
  },
  data () {
    return {
      types: [{
        key: 'number',
        title: 'Number'
      }, {
        key: 'string',
        title: 'String'
      }, {
        key: 'object',
        title: 'Object'
      }, {
        key: 'array',
        title: 'Array'
      }, {
        key: 'boolean',
        title: 'Boolean'
      }, {
        key: 'null',
        title: 'Null'
      }]
    }
  },
  methods: {
    handleCommand (cmd) {
      if (cmd === 'addItem') {
        this.objectEditor.addItem()
      } else {
        this.typeEditor.changeType(cmd)
      }
    }
  }
}
</script>

<style scoped>
.selected-item {
  color: greenyellow;
}
</style>
