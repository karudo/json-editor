<template>
  <span>: {{fl}} :</span>
</template>

<script>
export default {
  props: ['schema'],
  computed: {
    fl () {
      return this.schema.type.toUpperCase()[0]
    }
  }
}
</script>
