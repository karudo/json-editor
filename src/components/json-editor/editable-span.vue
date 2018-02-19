<template>
  <span class="json-editor-editable-span"
  >
    <span
    >"</span><span contenteditable="true"
                   @focus="onFocus"
                   @blur="onBlur"
                   @input="onInput"
              >{{value}}</span><span
    >"</span>
  </span>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    value: String,
    required: true
  },
  data () {
    return {
      pValue: ''
    }
  },
  methods: {
    onFocus () {
      this.pValue = this.value
    },
    onBlur () {
      this.$emit('change', this.pValue)
    },
    onInput (e) {
      this.pValue = e.target.innerText
    }
  }
}
</script>

<style scoped>
.json-editor-editable-span:hover {
  background-color: yellow;
}
</style>
