<template>
  <span style="cursor: pointer">
    :
    <el-dropdown trigger="click"
                 :show-timeout="100"
                 @command="handleCommand"
    >
      <span class="el-dropdown-link"><i class="el-icon-setting"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(t, idx) in menuItems"
                          :key="t.title"
                          :command="idx"
                          :class="t.selected && 'selected-item'"
                          :divided="t.divided"
        >
          {{t.title}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    :
  </span>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: () => []
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
    handleCommand (idx) {
      this.menuItems[idx].cb()
    }
  }
}
</script>

<style scoped>
.selected-item {
  color: greenyellow;
}
</style>
