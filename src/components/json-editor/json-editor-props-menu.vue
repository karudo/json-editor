<template>
  <b-dropdown :id="htmlId" no-caret variant="link" size="sm">
    <template slot="button-content">
      <span class="fa fa-cog"></span>
    </template>
    <template v-for="(t, idx) in menuItems">
      <b-dropdown-divider v-if="t.divider" :key="t.title"></b-dropdown-divider>
      <b-dropdown-item v-else :active="t.selected" :key="t.title" @click="handleCommand(idx)">
        {{t.title}}
      </b-dropdown-item>

    </template>
  </b-dropdown>
</template>

<script>
let i = 0
export default {
  props: {
    menuItems: Array,
    htmlId: {
      default: () => `props-menu-${i++}`
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
