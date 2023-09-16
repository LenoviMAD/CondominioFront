<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Gasto"
  >
    <template v-slot:modalName> Agregar Gasto </template>
    <template v-slot:modalIputs>
      <q-input
        label="Nombre *"
        v-model="name"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-input
        label="Compañía *"
        v-model="company"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-input
        label="Monto *"
        v-model="amount"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        outlined
        dense
      />
      <q-input
        label="Descripcion *"
        v-model="description"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        type="textarea"
        outlined
        dense
      />
      <div class="col-sm-12 col-md-12 q-gutter-sm">
        <q-radio v-model="shape" val="line" label="Comun" />
        <q-radio v-model="shape" val="rectangle" label="Por torre" />
        <q-radio v-model="shape" val="ellipse" label="Por apartamento" />
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
      title: '',
      body: '',
    });

    // Actualizar estado local con el current item
    watchEffect(() => {
      if (Object.values(props.currentItem).length) {
        Object.assign(data, props.currentItem);
      } else {
        Object.keys(data).forEach((key) => {
          data[key] = '';
        });
      }
    });

    return {
      data,
      shape: ref("line"),
      name: ref(''),
      company: ref(''),
      description: ref(''),
      amount: ref(null),
    };
  },
};
</script>

<style>
</style>
