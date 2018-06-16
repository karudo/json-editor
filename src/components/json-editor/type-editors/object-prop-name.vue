<template>
  <div>
    <div class="complex-prop-name object-prop-name" @click="$refs.modal.show()">
      {{name}}
    </div>
    <modal-name-editor ref="modal" :name="name" :names="props" @change="handleChange"/>
  </div>
</template>

<script>
import ModalNameEditor from './modal-name-editor'
export default {
  components: {ModalNameEditor},
  props: ['name', 'props'],
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    handleChange (newName) {
      this.$emit('change', newName)
    }
  }
}
</script>
