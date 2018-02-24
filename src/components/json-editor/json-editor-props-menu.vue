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
      </el-dropdown-menu>
    </el-dropdown>
    :
  </span>
</template>

<script>
import {typeSymbol} from './symbols'
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
    jsonEditor: {
      from: typeSymbol
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
      this.jsonEditor.changeType(cmd)
    }
  }
}
</script>

<style scoped>
.selected-item {
  color: greenyellow;
}
</style>
