<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="(breadcrumb, index) in breadcrumbList" 
      :key="index"
      :label="breadcrumb.label"
      :to="breadcrumb.to"
      :icon="breadcrumb.icon"
    />
  </q-breadcrumbs>
</template>

<script>
export default {
  props: {
    breadcrumbList: Array,
  },
};
</script>

<style>
</style>