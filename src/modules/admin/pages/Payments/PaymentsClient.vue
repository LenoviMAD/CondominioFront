<template>
  <h1 class="text-h4 q-mt-none box-shadow section">
    <q-btn
      flat
      icon="arrow_back_ios"
      text-color="black"
      :to="{ name: 'dashboardAdmin' }"
      title="Atrás"
    />Registro de Pagos
  </h1>
  <payments-table
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :routeBtn="routeBtn"
    :titleTable="titleTable"
    :registerPerPage="registerPerPage"
    :clickFunction="toggleModal"
  />
  <payments-form
    :modal="modal"
    :closeModal="closeModal"
    :currentItem="currentItem"
    :handleSubmit="handleSubmit"
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
    const registerPerPage = ref([12]);

    const currentItem = computed(() => store.getters["user/payments/getCurrentItem"]);
    // Cierra el modal y resetea nuestro currentItem
    const closeModal = () => {
      if (Object.values(currentItem.value).length) {
        store.commit("user/payments/setCurrentItem", {});
      }
      store.commit("user/payments/toggleModal");
    };

    // Abre y cierra el modal
    const toggleModal = () => {
      console.log("hola");
      store.commit("user/payments/toggleModal");
    };

    // Formulario agregar y editar
    const handleSubmit = async (data) => {
      // EDITAMOS
      if (Object.values(currentItem.value).length) {
        let target = {};
        Object.assign(target, store.state["user"]["payments"].currentItem);

        Object.assign(target, data);
        // const { ok, message } = await saveEditEmployed(target);
        // console.log(message, "message");
        if (ok) {
        } else {
        }
        // Close modal
        store.commit("user/payments/toggleModal");
        store.commit("user/payments/setCurrentItem", {});
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
        return;
      }

      // GUARDAMOS NUEVO ITEM

      store.commit("user/payments/toggleModal");
      if (ok) {
      } else {
      }
      // Close modal
      // reseteamos
      Object.keys(data).forEach((key) => {
        data[key] = "";
      });
    };
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
    });

    return {
      onMounted,
      modal: computed(() => store.state["user"]["payments"].modal),
      filter: ref(""),
      columns,
      rows,
      titleTable,
      registerPerPage,
      closeModal,
      handleSubmit,
      toggleModal,
    };
  },
};
</script>
