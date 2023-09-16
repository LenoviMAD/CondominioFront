<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Productos"
  >
    <template v-slot:modalName> Agregar Productos </template>
    <template v-slot:modalIputs>
      <q-input
        label="Nombre *"
        v-model="data.name"
        outlined
        :rules="[(val) => !!val || 'Campo requerido']"
        lazy-rules
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Inventario *"
        v-model="data.stock"
        outlined
        lazy-rules
        type="number"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Precio por unidad*"
        v-model="data.price"
        outlined
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        :rules="[(val) => !!val || 'Campo requerido']"
        type="number"
        prefix="Bs."
        class="col-sm-6 col-md-6"
      />
      <q-file label="Subir Imagen *" outlined v-model="data.imgData" />
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
      name: "",
      stock: "",
      price: "",
      imgData: "",
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
    };
  },
};
</script>

<style></style>
