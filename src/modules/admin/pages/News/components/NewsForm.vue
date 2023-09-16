<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Noticia"
  >
    <template v-slot:modalName> Agregar Noticia </template>
    <template v-slot:modalIputs>
      <q-input
        label="Título de notícia *"
        v-model="title"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-select
        label="Categoría"
        v-model="model"
        :options="options"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <div class="col-sm-12 col-md-12">
        <q-editor v-model="editor" min-height="5rem" />
      </div>
    </template>
  </sen-modal-form>
</template>

<script>
import { reactive, watchEffect, ref } from "vue";

export default {
  props: {
    modal: Boolean,
    currentItem: Object,
    handleSubmit: Function,
    closeModal: Function,
  },
  setup(props) {
    const data = reactive({
      title: "",
      body: "",
    });

    // Actualizar estado local con el current item
    watchEffect(() => {
      if (Object.values(props.currentItem).length) {
        Object.assign(data, props.currentItem);
      } else {
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
      }
    });

    return {
      data,
      model: ref(null),
      title: ref(null),
      editor: ref(null),
      right: ref(false),
      options: ["Categoria 1", "Categoria 2"],
    };
  },
};
</script>

<style>
</style>
