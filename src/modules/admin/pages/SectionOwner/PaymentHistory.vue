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
    amountPaid: "amountPaid",
    methodPayment: "methodPayment",
    bank: "bank",
    state: "state",
    paymentDate: "paymentDate",
    verificationDate: "verificationDate",
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
    label: "Número de comrpobante",
    align: "left",
    field: (row) => row.nroCharges,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "amountPaid",
    required: true,
    label: "Monto pagado",
    align: "left",
    field: (row) => row.amountPaid,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "methodPayment",
    required: true,
    label: "Forma de pago",
    align: "left",
    field: (row) => row.methodPayment,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "bank",
    required: true,
    label: "Banco",
    align: "left",
    field: (row) => row.bank,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "state",
    required: true,
    label: "Estado",
    align: "left",
    field: (row) => row.state,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "paymentDate",
    required: true,
    label: "Fecha de pago",
    align: "left",
    field: (row) => row.paymentDate,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "verificationDate",
    required: true,
    label: "Fecha de verificacion",
    align: "left",
    field: (row) => row.verificationDate,
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
      labelTitle: ref("Historial de pagos"),
      labelAdd: ref(null),
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