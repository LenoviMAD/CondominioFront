<template>
  <expenses-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :labelAdd="labelAdd"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
  <expenses-form
    :modal="modal"
    :closeModal="toggleModal"
    :currentItem="currentItem"
    :handleSubmit="handleSubmit"
  />
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import ExpensesForm from "./components/ExpensesForm.vue";
import ExpensesList from "./components/ExpensesList.vue";

var rows = [
  {
    name: "name1",
    company: "company1",
    description: "description1",
    common: "common1",
    buildings: "torre1,torre2",
    apartments: "Incluye todos",
    id: 1,
  }
];
const columns = [
  {
    name: "actions",
    label: "Acciones",
    align: "left",
  },
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "company",
    required: true,
    label: "Compañia",
    align: "left",
    field: (row) => row.company,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "description",
    required: true,
    label: "Descripción",
    align: "left",
    field: (row) => row.description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "common",
    required: true,
    label: "Común",
    align: "left",
    field: (row) => row.common,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "buildings",
    required: true,
    label: "Torres",
    align: "left",
    field: (row) => row.buildings,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "apartments",
    required: true,
    label: "Apartmentos",
    align: "left",
    field: (row) => row.apartments,
    format: (val) => `${val}`,
    sortable: true,
  }
];
const actions = {
  icon: "more_vert",
  customClass: "no-decoration",
  list: [
    {
      icon: "delete",
      title: "Eliminar",
      fn: (id) => console.log("mi id delete", id),
    },
    {
      icon: "edit",
      title: "Editar",
      fn: (id) => console.log("mi id edit", id),
    },
  ],
};
export default {
  components: { ExpensesList, ExpensesForm },
  setup() {
    const modal = ref(false);
    const currentItem = reactive({});
    const toggleModal = () => {
      modal.value = !modal.value;
    };
    const handleSubmit = () => {
      console.log("handleSubmit");
    };
    return {
      columns,
      rows,
      actions,
      filter: ref(""),
      labelTitle: ref("Gastos"),
      labelAdd: ref("Agregar Gasto"),
      right: ref(false),
      loading: ref(false),
      model: ref(null),
      modal,
      currentItem,
      toggleModal,
      handleSubmit,
    };
  },
};
</script>

<style>
</style>