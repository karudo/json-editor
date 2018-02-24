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
                          :key="t"
                          :command="t"
                          :class="schema.type === t && 'selected-item'"
        >
          {{t}}
        </el-dropdown-item>
        <slot name="add-items"></slot>
      </el-dropdown-menu>
    </el-dropdown>
    :
  </span>
</template>

<script>
import {typeSymbol} from './symbols'
export default {
  props: ['schema'],
  inject: {
    jsonEditor: {
      from: typeSymbol
    }
  },
  data () {
    return {
      types: [
        'number',
        'string',
        'object',
        'array',
        'boolean',
        'null'
      ]
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
