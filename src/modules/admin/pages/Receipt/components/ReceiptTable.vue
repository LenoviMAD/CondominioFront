<template>
  <sen-table-with-action
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :routeBtn="routeBtn"
    :labelAdd="labelAdd"
    :titleTable="titleTable"
    :clickFunction="clickFunction"
    :registerPerPage="registerPerPage"
  />
</template>

<script>
export default {
  props: {
    labelAdd: String,
    titleTable: String,
    registerPerPage: Array,
    filter: String,
    rows: Array,
    columns: Array,
    routeBtn: String,
    clickFunction: Function,
  },
};
</script>

<style></style>
