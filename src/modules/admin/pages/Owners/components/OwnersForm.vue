<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Propietario"
  >
    <template v-slot:modalName> Agregar Propietario </template>
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
        label="Apellido *"
        v-model="lastname"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-input
        label="Cédula *"
        v-model="ci"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-input outlined dense type="date" class="col-sm-6 col-md-6" />
      <q-input
        label="Correo electronico *"
        v-model="email"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        type="email"
        outlined
        dense
      />
      <q-input
        label="Teléfono *"
        v-model="phone"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        mask="(###) ### - ####"
        outlined
        dense
      />
      <q-input
        label="Contraseña *"
        v-model="password"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        type="pasword"
        outlined
        dense
      />
      <q-input
        label="Confirmar Contraseña *"
        v-model="confirmPassword"
        :rules="[(val) => !!val || 'Campo requerido']"
        type="pasword"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <h3 class="col-md-12 col-sm-12 text-h6 q-my-none">
        Selecciona los apartamentos pertenecientes al propietario
      </h3>
      <q-select
        outlined
        dense
        multiple
        :options="options"
        label="Apartamentos"
        class="col-sm-12 col-md-12"
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
      model: ref(null),
      name: ref(''),
      lastname: ref(''),
      email: ref(''),
      phone: ref(''),
      password: ref(''),
      confirmPassword: ref(''),
      ci: ref(''),
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
    };
  },
};
</script>

<style>
</style>
