<template>
  <div>
    <p class="card">
 
      <rich-text nodes="text"></rich-text>
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
