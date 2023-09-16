<template>
  <defaulters-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { date, useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";
// Iternals components
import DefaultersForm from "./components/DefaultersForm.vue";
import DefaultersList from "./components/DefaultersList.vue";

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
  components: { DefaultersList, DefaultersForm },
  setup() {
    const columns = reactive([
      {
        name: "apartment",
        required: true,
        label: "APTO",
        align: "left",
        field: (row) => row.apartment,
        format: (val) => `${val}`,
        sortable: true,
      },
    ]);
    const rows = reactive([]);
    const $q = useQuasar();
    const store = useStore();

    const { getDefaultersByIdResidential } = useAdmin();

    const modal = ref(false);
    const currentItem = reactive({});
    const toggleModal = () => {
      modal.value = !modal.value;
    };
    const handleSubmit = () => {
      console.log("handleSubmit");
    };

    onMounted(async () => {
      const idResidential = store.state["auth"].idResidential;
      const { ok, message } = await getDefaultersByIdResidential(idResidential);
      var dateNoRep = "";
      var monthSave = [];
      var amountPaymentBsSum = [];
      var amountPaymentUsdSum = [];
      var penaltyPercent = 0;
      var flag = null;
      message.data.forEach((element) => {
        var dateInp = new Date(element.date);
        var month = dateInp.getMonth() + 1;
        var day = dateInp.getDate();

        if (dateNoRep != day + "-" + month) {
          //Armamos las columna dinamicamente
          columns.push({
            name: "accuDebt" + month,
            required: true,
            label: "Deuda acumulada Bs. " + day + "-" + month,
            align: "left",
            field: (row) => row["usdTotal" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "usdDebt" + month,
            required: true,
            label: "Deuda acumulada USD. " + day + "-" + month,
            align: "left",
            field: (row) => row["usdDebt" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "bsDelinquentInterest" + month,
            required: true,
            label: "Interes Mora Bs. " + day + "-" + month,
            align: "left",
            field: (row) => row["bsDelinquentInterest" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "usdDelinquentInterest" + month,
            required: true,
            label: "Interes Mora USD " + day + "-" + month,
            align: "left",
            field: (row) => row["usdDelinquentInterest" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "bsTotal" + month,
            required: true,
            label: "Total Acumulado Bs. " + day + "-" + month,
            align: "left",
            field: (row) => row["bsTotal" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "usdTotal" + month,
            required: true,
            label: "Total Acumulado USD " + day + "-" + month,
            align: "left",
            field: (row) => row["usdTotal" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "bsReceipt" + month,
            required: true,
            label: "Recibo Bs. " + day + "-" + month,
            align: "left",
            field: (row) => row["bsReceipt" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          columns.push({
            name: "usdReceipt" + month,
            required: true,
            label: "Recibo USD  " + day + "-" + month,
            align: "left",
            field: (row) => row["usdReceipt" + month],
            format: (val) => `${val}`,
            sortable: true,
          });
          monthSave.push(month);
        }
        console.log(rows.find((element3) => element3.idApartment == element.idApartment));
        if (!rows.find((element3) => element3.idApartment == element.idApartment)) {
          rows.push({
            id: element.id,
            idApartment: element.idApartment,
            apartment: element.apartment,
            ["accuDebt" + month]: element.amountPaymentBs,
            ["usdDebt" + month]: element.id,
            ["bsDelinquentInterest" + month]: element.idApartment,
            ["usdDelinquentInterest" + month]: element.amountPaymentBs,
            ["bsTotal" + month]: element.amountPaymentUsd,
            ["usdTotal" + month]: month,
            ["bsReceipt" + month]: month,
            ["usdReceipt" + month]: month,
            month: month,
            number: element.number,
          });
        }
        if (flag) {
          rows.forEach((element2) => {
            console.log("entre");
            if (
              element.idApartment == element2.idApartment &&
              element.idApartment == element2.idApartment
            ) {
              element2.id = element.id;
              element2.idApartment = element.idApartment;
              element2.apartment = element.apartment;
              element2["accuDebt" + month] = element.idApartment;
              element2["usdDebt" + month] = element.id;
              element2["bsDelinquentInterest" + month] = element.idApartment;
              element2["usdDelinquentInterest" + month] = element.amountPaymentBs;
              element2["bsTotal" + month] = element.amountPaymentUsd;
              element2["usdTotal" + month] = month;
              element2["bsReceipt" + month] = month;
              element2["usdReceipt" + month] = month;
              element2.month = month;
              element2.number = element.number;
            }
          });
        }
        flag = true;
        dateNoRep = day + "-" + month;
      });

      console.log(message);
    });

    return {
      columns,
      rows,
      actions,
      filter: ref(""),
      labelTitle: ref("Deudores"),
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

<style></style>
