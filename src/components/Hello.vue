<template>
  <div class="qwe">
    <div class="row">
      <json-editor-autodetect v-model="value"/>
    </div>
    <div class="row">
      <div><pre>{{value}}</pre></div>
      <div><pre>{{schema}}</pre></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const value = {
      q1: 9,
      q2: {
        xsss: 'yes!',
        mama: null
      },
      q3: [
        {ex5: false},
        [
          'd',
          false,
          9
        ]
      ]
    }
    return {
      value
    }
  },
  computed: {
    schema () {
      return this.$store.state.jsonEditor
    }
  }
}
</script>

<style scoped lang="less">
.qwe {
  display: flex;
  .row {
    width: 50%;
  }
}
</style>
