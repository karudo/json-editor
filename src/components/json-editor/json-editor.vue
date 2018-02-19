<template>
  <div>
    <component :is="`json-editor-${schema.type}`"
               :schema="schema"
               :value="value"
    />
  </div>
</template>

<script>
export default {
  props: ['schema', 'value']
}
</script>

<style scoped>

</style>
