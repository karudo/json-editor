<template>
  <span class="json-editor-editable-span"
        contenteditable="true"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
  >{{value}}</span>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    }
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
      this.$nextTick(() => {
        this.$el.innerText = this.value
      })
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
