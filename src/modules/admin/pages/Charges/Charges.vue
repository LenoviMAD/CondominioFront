<template>
  <charges-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :labelAdd="labelAdd"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
  <charges-form
    :modal="modal"
    :closeModal="toggleModal"
    :currentItem="currentItem"
    :handleSubmit="handleSubmit"
  />
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import ChargesForm from "./components/ChargesForm.vue";
import ChargesList from "./components/ChargesList.vue";

var rows = [
  {
    nroCharges: 76,
    apartament: "apartament",
    amount: 200,
    status: "status",
    month: "month",
    id: 1,
  },
];
const columns = [
  {
    name: "actions",
    label: "Acciones",
    align: "left",
  },
  {
    name: "nroCharges",
    required: true,
    label: "Número",
    align: "left",
    field: (row) => row.nroCharges,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "apartament",
    required: true,
    label: "Apartamento",
    align: "left",
    field: (row) => row.apartament,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Monto",
    align: "left",
    field: (row) => row.amount,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Estado",
    align: "left",
    field: (row) => row.status,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "month",
    required: true,
    label: "Mes",
    align: "left",
    field: (row) => row.month,
    format: (val) => `${val}`,
    sortable: true,
  },
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
  components: { ChargesList, ChargesForm },
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
      labelTitle: ref("Cobros"),
      labelAdd: ref("Agregar Cobro"),
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