<template>
  <span class="json-editor-editable-span">
    <span v-if="isString">"</span
    ><span :class="spanClass" contenteditable="true"
           @focus="onFocus"
           @blur="onBlur"
           @input="onInput"
    >{{value}}</span
    ><span v-if="isString">"</span>
  </span>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    value: [String, Number],
    required: true
  },
  data () {
    return {
      pValue: ''
    }
  },
  computed: {
    isString () {
      return typeof this.value === 'string'
    },
    spanClass () {
      return {
        string: this.isString,
        number: !this.isString
      }
    }
  },
  methods: {
    onFocus () {
      this.pValue = this.value
    },
    onBlur () {
      const v = this.isString ? this.pValue : Number(this.pValue)
      this.$emit('change', v)
    },
    onInput (e) {
      this.pValue = e.target.innerText
    }
  }
}
</script>

<style scoped>
.json-editor-editable-span .number {
  color: blue;
}
.json-editor-editable-span .string {
  color: green;
}
.json-editor-editable-span:hover {
  background-color: yellow;
}
</style>
