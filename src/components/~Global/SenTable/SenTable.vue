<template>
  <q-table
    :title="labelTitle"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    color="primary"
    row-key="name"
    :loading="loading"
    class="table table-a"
    no-data-label="No hay datos para mostrar"
    rows-per-page-label="Registros por pagina"
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
        v-if="labelAdd"
        size="md"
        @click="toggleModal"
        class="q-mr-sm"
        color="primary"
        :label="labelAdd || ''"
        :to="{ name: to }"
      />
    </template>

    <!-- Table header (thead)  -->
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <!-- Table body (tbody)  -->
    <template v-slot:body="props">
      <q-tr :props="props">
        <template v-for="col in props.cols">
          <q-td :key="col.name" v-if="col.name !== 'actions'">
            {{ col.value }}
          </q-td>
        </template>
        <q-td>
          <sen-btn-dropdown :btnDropdown="actions" :actionId="props.row.id" />
        </q-td>
      </q-tr>
    </template>

    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center col-no-data q-gutter-sm">
        <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        <span> {{ message }} </span>
      </div>
    </template>
  </q-table>
</template>

<script>
export default {
  props: {
    labelAdd: String,
    labelTitle: String,
    filter: String,
    to: String,
    rows: Array,
    columns: Array,
    actions: Object,
    loading: Boolean,
    toggleModal: Function,
  },
};
</script>

<style>
.col-no-data {
  color: #388e3c;
}
</style>
