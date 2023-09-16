<template>
  <section-owner-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :labelAdd="labelAdd"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import SectionOwnerForm from "./components/SectionOwnerForm.vue";
import SectionOwnerList from "./components/SectionOwnerList.vue";

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
  components: { SectionOwnerList, SectionOwnerForm },
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
      labelTitle: ref("Recibo de cobros"),
      labelAdd: ref(""),
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