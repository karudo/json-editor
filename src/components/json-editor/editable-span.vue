<template>
  <span class="json-editor-editable-span"
        :class="classes"
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
      focused: false,
      pValue: ''
    }
  },
  computed: {
    classes () {
      return {
        empty: !this.value && !this.focused
      }
    }
  },
  methods: {
    onFocus () {
      this.focused = true
      this.pValue = this.value
    },
    onBlur () {
      this.focused = false
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
.json-editor-editable-span {
  display: inline-block;
  min-width: 24px;
  background: #fcffe0;
}
.json-editor-editable-span:hover {
  background-color: yellow;
}
.json-editor-editable-span.empty::after {
  content: "empty";
  pointer-events: none;
  color: #d3d3d3;
  font-size: 9px;
}

</style>
