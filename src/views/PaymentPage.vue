<template>
  <div style="margin:auto">
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
 
  export default {
    data() {
      return {
        value: 'bitcoin:2NAr4rDnwhTfDnb9ziNpF5JLJTNLFfeoM97?amount=0.01',
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },
  }
</script> 