<template>
  <admins-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :labelAdd="labelAdd"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
  <!-- <admins-form
    :modal="modal"
    :closeModal="toggleModal"
    :currentItem="currentItem"
    :handleSubmit="handleSubmit"
  /> -->
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import AdminsForm from "./components/AdminsForm.vue";
import AdminsList from "./components/AdminsList.vue";

var rows = [
  {
    name: "name1",
    email: "email1",
    id: 1,
  },
  {
    name: "name2",
    email: "email2",
    id: 2,
  },
  {
    name: "email3",
    email: "email3",
    id: 3,
  },
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
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.email,
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
  components: { AdminsList, AdminsForm },
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
      labelTitle: ref("Operadores"),
      labelAdd: ref("Agregar Operador"),
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