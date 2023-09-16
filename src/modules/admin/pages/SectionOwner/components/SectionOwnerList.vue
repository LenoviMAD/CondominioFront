<template>
  <sen-table
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :toggleModal="toggleModal"
    :labelAdd="labelAdd"
    :labelTitle="labelTitle"
    :actions="actions"
  />
</template>

<script>
export default {
  props: {
    labelAdd: String,
    labelTitle: String,
    filter: String,
    rows: Array,
    columns: Array,
    actions: Object,
    loading: Boolean,
    toggleModal: Function,
  },
};
</script>

<style>
</style>
