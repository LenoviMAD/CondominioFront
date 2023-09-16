<template>
  <h1 class="text-h4 q-mt-none box-shadow section">
    <q-btn
      flat
      icon="arrow_back_ios"
      text-color="black"
      :to="{ name: 'dashboardUser' }"
      title="Atrás"
    />Recibos por Pagar
  </h1>
  <payments-table
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :routeBtn="routeBtn"
    :labelAdd="labelAdd"
    :titleTable="titleTable"
    :registerPerPage="registerPerPage"
    :clickFunction="toggleModal"
  />
</template>

<script>
import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useUser from "src/modules/user/composables/useUser";

import paymentsTable from "./components/PaymentsTable.vue";
import paymentsForm from "./components/PaymentsForm.vue";

const columns = [
  {
    name: "number",
    required: true,
    label: "Numero de factura",
    align: "left",
    field: (row) => row.number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Fecha de creación",
    field: "date",
    sortable: true,
  },
  {
    name: "amountPaymentBs",
    label: "Valor a pagar (Bs)",
    field: "amountPaymentBs",
    sortable: true,
  },
  {
    name: "amountPaymentUsd",
    label: "Valor a pagar (USD)",
    field: "amountPaymentUsd",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    sortable: true,
  },
];

export default {
  components: { paymentsTable, paymentsForm },
  setup() {
    const { getReceiptByIdUser } = useUser();

    const rows = reactive([]);
    const store = useStore();
    const titleTable = ref("Reportes de pago");
    const labelAdd = ref("Reportar pago");
    const routeBtn = ref("PaymentsRecordClient");
    const registerPerPage = ref([12]);

    onMounted(async () => {
      const idUser = store.state["auth"].id;
      const { ok, message } = await getReceiptByIdUser(idUser);
      console.log(message);
      if (message.data) {
        message.data.forEach((element) => {
          rows.push({
            id: element.id,
            number: element.number,
            date: element.date,
            amountPaymentBs: `${element.amountPaymentBs} Bs`,
            amountPaymentUsd: `${element.amountPaymentUsd} USD`,
            status: element.status,
          });
        });
      }
      //       const idApartment = store.state["auth"].currentResidential.idApartment;
      //       const dataPayment = await getPaymentByIdApartment(idApartment);
    });

    return {
      onMounted,
      modal: computed(() => store.state["user"]["payments"].modal),
      filter: ref(""),
      columns,
      rows,
      titleTable,
      labelAdd,
      routeBtn,
      registerPerPage,
    };
  },
};
</script>
