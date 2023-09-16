<template>
  <invoices-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :labelAdd="labelAdd"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
  <invoices-form
    :modal="modal"
    :closeModal="toggleModal"
    :currentItem="currentItem"
    :handleSubmit="handleSubmit"
  />
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import InvoicesForm from "./components/InvoicesForm.vue";
import InvoicesList from "./components/InvoicesList.vue";

var rows = [
  {
    nroInvoice: 88,
    service: "servicio y compa;ia",
    amount: 88,
    date: "10-10-2021",
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
    name: "nroInvoice",
    required: true,
    label: "# Factura",
    align: "left",
    field: (row) => row.nroInvoice,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "service",
    required: true,
    label: "Servicio - Compañía",
    align: "left",
    field: (row) => row.service,
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
    name: "date",
    required: true,
    label: "Fecha",
    align: "left",
    field: (row) => row.date,
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
  components: { InvoicesList, InvoicesForm },
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
      labelTitle: ref("Facturas"),
      labelAdd: ref("Agregar Factura"),
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