<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Torre"
  >
    <template v-slot:modalName> Agregar Torre </template>
    <template v-slot:modalIputs>
      <q-input
        label="Nombre *"
        v-model="name"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        outlined
        dense
      />
      <q-select
        label="Selecciona un administrador"
        :rules="[(val) => !!val || 'Campo requerido']"
        v-model="model"
        :options="options"
        class="col-sm-12 col-md-12"
        outlined
        dense
      />
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
      name: ref(''),
      right: ref(false),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
};
</script>

<style>
</style>
