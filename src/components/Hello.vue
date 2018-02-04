<template>
  <div>
    <el-button type="success">Success</el-button>
    <el-progress :percentage="70"/>
    <el-date-picker
      v-model="dt"
      type="datetime"
      placeholder="Select date and time">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dt: ''
    }
  }
}
</script>
