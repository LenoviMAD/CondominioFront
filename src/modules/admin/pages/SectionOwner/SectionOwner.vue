<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-6 col-sm-6">
      <q-card>
        <q-card-section>
          <q-form class="row q-col-gutter-md">
            <q-input
              label="Nombre *"
              v-model="name"
              :rules="[(val) => !!val || 'Campo requerido']"
              outlined
              dense
              class="col-sm-6 col-md-6"
            />
            <q-input
              label="Cedula *"
              v-model="ci"
              :rules="[(val) => !!val || 'Campo requerido']"
              outlined
              dense
              type="number"
              class="col-sm-6 col-md-6"
            />
            <q-input
              label="Email *"
              v-model="email"
              :rules="[(val) => !!val || 'Campo requerido']"
              outlined
              dense
              type="email"
              class="col-sm-12 col-md-12"
            />
            <q-input
              label="Telefono *"
              v-model="phone"
              :rules="[(val) => !!val || 'Campo requerido']"
              mask="(###) ### - ####"
              outlined
              dense
              lazy-rules
              class="col-sm-12 col-md-12"
            />
            <div>
              <q-btn
                label="Actualizar datos"
                type="submit"
                color="primary"
                class="q-mr-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-12 col-sm-12">
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
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import SectionOwnerForm from "./components/SectionOwnerForm.vue";
import SectionOwnerList from "./components/SectionOwnerList.vue";

var rows = [
  {
    amount: 200,
    nro: 1,
    date: "10-10-2020",
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
    name: "nro",
    required: true,
    label: "Número",
    align: "left",
    field: (row) => row.nro,
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
  {
    name: "amount",
    required: true,
    label: "Monto",
    align: "left",
    field: (row) => row.amount,
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
      filter: ref(''),
      labelTitle: ref("Recibos por pagar"),
      labelAdd: ref(false),
      right: ref(false),
      loading: ref(false),
      model: ref(null),
      phone: ref(''),
      name: ref(''),
      ci: ref(''),
      email: ref(''),
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