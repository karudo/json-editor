<template>
  <b-modal :id="htmlId"
           ref="modal"
           @ok="handleOk"
           @shown="handleShown">
    <form @submit.stop.prevent="handleSubmit">
      <b-form-input type="text"
                    ref="input"
                    :state="isGoodName"
                    v-model="editName"></b-form-input>
    </form>
  </b-modal>
</template>

<script>
let i = 0
export default {
  props: {
    name: {},
    names: {},
    htmlId: {
      default: () => `modal-name-edit-${i++}`
    }
  },
  data () {
    return {
      editName: undefined
    }
  },
  computed: {
    isGoodName () {
      return !(this.names.indexOf(this.editName) > -1 && this.editName !== this.name)
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    },
    emitName () {
      if (this.isGoodName) {
        this.$emit('change', this.editName)
      }
    },
    handleOk () {
      this.emitName()
    },
    handleSubmit () {
      this.emitName()
      this.$refs.modal.hide()
    },
    handleShown () {
      this.editName = this.name
      this.$refs.input.focus()
    }
  }
}
</script>
