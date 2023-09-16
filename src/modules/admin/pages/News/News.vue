<template>
  <news-list
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :filter="filter"
    :labelAdd="labelAdd"
    :toggleModal="toggleModal"
    :labelTitle="labelTitle"
    :actions="actions"
  />
  <news-form
    :modal="modal"
    :closeModal="toggleModal"
    :currentItem="currentItem"
    :handleSubmit="handleSubmit"
  />
</template>

<script>
import { ref, reactive } from "vue";

// Iternals components
import NewsForm from "./components/NewsForm.vue";
import NewsList from "./components/NewsList.vue";

var rows = [
  {
    title: "title",
    detail: "detail1",
    category: "category1",
    createdDate: "10-12-2021",
    id: 1,
  },
  {
    title: "title2",
    detail: "detail2",
    category: "category2",
    createdDate: "10-12-2021",
    id: 2,
  }
];
const columns = [
  {
    name: "actions",
    label: "Acciones",
    align: "left",
  },
  {
    name: "title",
    required: true,
    label: "Título",
    align: "left",
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "detail",
    required: true,
    label: "detail",
    align: "left",
    field: (row) => row.detail,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    required: true,
    label: "category",
    align: "left",
    field: (row) => row.category,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "createdDate",
    required: true,
    label: "createdDate",
    align: "left",
    field: (row) => row.createdDate,
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
  components: { NewsList, NewsForm },
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
      labelTitle: ref("Noticias"),
      labelAdd: ref("Agregar Noticias"),
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