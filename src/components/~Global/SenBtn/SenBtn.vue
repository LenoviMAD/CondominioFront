<template>
  <q-btn outline rounded :color="color" :label="label" :class="customClass" />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    color: String,
    customClass: String,
  },
});
</script>
<style lang="scss">
</style>