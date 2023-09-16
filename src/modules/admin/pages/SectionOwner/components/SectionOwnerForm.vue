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
        v-model="modelBuilding"
        :options="optionsBuilding"
        outlined
        dense
        class="col-sm-12 col-md-12"
        label="Torre"
      />
      <q-select
        v-model="modelFloor"
        :options="optionsFloor"
        outlined
        dense
        class="col-sm-12 col-md-12"
        label="Piso"
      />
      <q-input
        label="Apartamento *"
        outlined
        dense
        lazy-rules
        type="number"
        class="col-sm-12 col-md-12"
      />
      <q-input
        label="Descripción *"
        outlined
        dense
        lazy-rules
        type="textarea"
        class="col-sm-12 col-md-12"
      />
      <q-input
        label="Título *"
        outlined
        dense
        lazy-rules
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Monto *"
        outlined
        dense
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Cuotas *"
        outlined
        dense
        lazy-rules
        type="number"
        class="col-sm-6 col-md-6"
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
      model: ref({ from: "2020/07/08", to: "2020/07/17" }),
      modelBuilding: ref(null),
      modelFloor: ref(null),
      right: ref(false),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      optionsFloor: ["1", "2", "3", "4", "5"],
      optionsBuilding: ["1", "2", "3", "4", "5"],
    };
  },
};
</script>

<style>
</style>
