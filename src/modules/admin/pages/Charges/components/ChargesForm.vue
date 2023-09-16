<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Cobro"
  >
    <template v-slot:modalName> Agregar Cobro </template>
    <template v-slot:modalIputs>
      <q-select
        label="Torre"
        v-model="modelBuilding"
        :options="optionsBuilding"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        outlined
        dense
      />
      <q-select
        label="Piso"
        v-model="modelFloor"
        :options="optionsFloor"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        outlined
        dense
      />
      <q-input
        label="Apartamento *"
        v-model="numberApartament"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        type="number"
        outlined
        dense
      />
      <q-input
        label="Descripción *"
        v-model="description"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-12 col-md-12"
        type="textarea"
        outlined
        dense
      />
      <q-input
        label="Título *"
        v-model="title"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-input
        label="Monto *"
        class="col-sm-6 col-md-6"
        v-model="amount"
        :rules="[(val) => !!val || 'Campo requerido']"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        outlined
        dense
      />
      <q-input
        label="Cuotas *"
        class="col-sm-6 col-md-6"
        v-model="fees"
        :rules="[(val) => !!val || 'Campo requerido']"
        type="number"
        outlined
        dense
      />
      <q-file dense outlined class="col-sm-6 col-md-6">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <div class="col-sm-12 col-md-12">
        <q-date style="width: 15px" v-model="model" range />
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
      model: ref({ from: '2020/07/08', to: '2020/07/17' }),
      modelBuilding: ref(null),
      modelFloor: ref(null),
      right: ref(false),
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      optionsFloor: ['1', '2', '3', '4', '5'],
      optionsBuilding: ['1', '2', '3', '4', '5'],
      numberApartament: ref(null),
      description: ref(''),
      title: ref(''),
      amount: ref(null),
      fees: ref(null),
    };
  },
};
</script>

<style>
</style>
