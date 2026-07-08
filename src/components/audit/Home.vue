<template>
<div>
  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'audit trail', to: '/audit-trail'},{text: ''}]" class="mt-0"/>
  <nxp-audit-trail-component/>
</div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>
