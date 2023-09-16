<template>
  <q-table
    grid
    :title="titleTable"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    hide-header
    no-data-label="No hay datos para mostrar"
    rows-per-page-label="Registros por pagina"
    :rows-per-page-options="registerPerPage"
    :pagination-label="
      (firstRowIndex, endRowIndex, totalRowsNumber) =>
        `${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber}`
    "
  >
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:top-left>
      <q-btn
        size="md"
        class="q-mr-sm"
        color="primary"
        icon-right="add"
        :label="labelAdd || ''"
        :to="{ name: routeBtn }"
      />
    </template>
    <template v-slot:bottom>
      <q-btn
        v-for="(item, index) in rows"
        size="md"
        class="q-mr-sm"
        color="primary"
        icon-right="add"
        @click="clickFunction"
        :label="item.date || ''"
      />
    </template>
  </q-table>
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
