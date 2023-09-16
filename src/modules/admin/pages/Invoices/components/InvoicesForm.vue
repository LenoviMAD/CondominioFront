<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Facturas"
  >
    <template v-slot:modalName> Agregar Facturas </template>
    <template v-slot:modalIputs>
      <q-input
        label="# Factura"
        v-model="nroFactura"
        outlined
        disabled
        dense
        lazy-rules
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        outlined
        value="12-08-2020"
        v-model="date"
        disabled
        dense
        lazy-rules
        type="date"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Monto *"
        v-model="amount"
        outlined
        dense
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="A nombre de *"
        v-model="toName"
        :rules="[val => !!val || 'Campo requerido']"
        outlined
        dense
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Descripcion *"
        v-model="description"
        :rules="[val => !!val || 'Campo requerido']"
        outlined
        dense
        type="textarea"
        class="col-sm-12 col-md-12"
      />
      <q-input
        label="Teléfono *"
        v-model="phone"
        outlined
        dense
        class="col-sm-6 col-md-6"
        :rules="[val => !!val || 'Campo requerido']"
        mask="(###) ### - ####"
      />
      <q-input
        label="Correo *"
        v-model="email"
        :rules="[val => !!val || 'Campo requerido']"
        outlined
        type="email"
        dense
        class="col-sm-6 col-md-6"
      />
      <q-file label="Documento *" dense outlined class="col-sm-12 col-md-12">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
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
      date: ref('20-10-2020'),
      amount: ref(0),
      toName: ref(''),
      description: ref(''),
      phone: ref(''),
      email: ref(''),
      nroFactura: ref(25785),
      right: ref(false),
    };
  },
};
</script>

<style>
</style>
