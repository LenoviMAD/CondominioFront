<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Operador"
  >
    <template v-slot:modalName> Agregar Operador </template>
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
        v-model="name"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        outlined
        dense
      />
      <q-input
        label="Email *"
        v-model="email"
        :rules="[(val) => !!val || 'Campo requerido']"
        class="col-sm-6 col-md-6"
        type="email"
        outlined
        dense
      />
      <!-- <div class="row">
        <q-btn-toggle
          v-model="model"
          push
          toggle-color="light-green-4"
          :options="[
            { value: 'one', slot: 'one' },
            { value: 'two', slot: 'two' },
          ]"
        >
          <template v-slot:one>
            <q-icon size="lg" class="q-mb-lg" name="perm_identity" />
            <header class="text-center">
              <span class="font-weight-bold">Administrador externo</span>
              <br />
              <span class="text-grey"
                >No vivo dentro del conjunto residencial</span
              >
            </header>
          </template>

          <template v-slot:two>
            <q-icon size="lg" class="q-mb-lg" name="perm_identity" />
            <header class="text-center">
              <span class="font-weight-bold">Administrador Interno</span>
              <br />
              <span class="text-grey"
                >Vivo dentro del conjunto residencial</span
              >
            </header>
          </template>
        </q-btn-toggle>
      </div> -->
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
      name: ref(""),
      email: ref(""),
      right: ref(false),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
};
</script>

<style>
</style>
