<template>
  <h1 class="text-h4 q-mt-none box-shadow section">
    <q-btn
      flat
      icon="arrow_back_ios"
      text-color="black"
      :to="{ name: 'dashboardAdmin' }"
      title="Atrás"
    />Recibo creadas
  </h1>
  <receipt-table
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :routeBtn="routeBtn"
    :labelAdd="labelAdd"
    :titleTable="titleTable"
    :clickFunction="verItem"
    :registerPerPage="registerPerPage"
  />
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";

import receiptTable from "./components/ReceiptTable.vue";

const columns = [
  {
    name: "number",
    required: true,
    label: "Número de Recibo",
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
  { name: "price", label: "Valor de Recibo (Bs)", field: "price", sortable: true },
  {
    name: "priceUsd",
    label: "Valor de Recibo (USD)",
    field: "priceUsd",
    sortable: true,
  },
];

export default {
  components: { receiptTable },
  setup() {
    const { getReceiptByIdResidential } = useAdmin();

    const rows = reactive([]);
    const itemView = ref([]);
    const store = useStore();
    const titleTable = ref("Recibos realizadas");
    const labelAdd = ref("Crear Recibo");
    const routeBtn = ref("receiptCreate");
    const registerPerPage = ref([12]);
    const verItem = (item) => {
      console.log(item);
    };

    const editarAction = (id) => {
      console.log(id, "editar");
    };
    const publishAction = (id) => {
      console.log(id, "Publicar");
    };
    const deleteAction = (id) => {
      console.log(id, "Eliminar");
    };

    onMounted(async () => {
      const idResidential = store.state["auth"].idResidential;
      const { ok, message } = await getReceiptByIdResidential(idResidential);
      console.log(message);
      if (message.data) {
        message.data.forEach((element) => {
          const actions = [];
          let colorStatus = "";
          //Guardamos las 3 acciones segun el status
          if (element.status == "Borrador") {
            actions.push({
              name: "Editar",
              color: "orange-4",
              icon: "edit",
              click: editarAction,
            });
            actions.push({
              name: "Publicar",
              color: "light-green-4",
              icon: "send",
              click: publishAction,
            });
            actions.push({
              name: "Eliminnar",
              color: "red-4",
              icon: "delete",
              click: deleteAction,
            });
            colorStatus = "bg-grey-4";
          }
          //   else if (element.status == "Pendiente por cobrar") {
          //     actions.push({
          //       name: "Editar",
          //       color: "orange-4",
          //       icon: "edit",
          //       click: editarAction,
          //     });
          //   }

          rows.push({
            number: element.number,
            date: element.date,
            colorStatus: colorStatus,
            price: `${element.price} Bs`,
            priceUsd: `${element.priceUsd} USD`,
            actions: actions,
          });
        });
      }
    });

    return {
      onMounted,
      filter: ref(""),
      columns,
      rows,
      titleTable,
      labelAdd,
      routeBtn,
      registerPerPage,
      verItem,
    };
  },
};
</script>
