<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Datos Bancarios"
  >
    <template v-slot:modalName> Agregar Cuenta Bancaria </template>
    <template v-slot:modalIputs>
      <q-select
        outlined
        v-model="data.banks"
        :options="banks"
        option-label="description"
        option-value="id"
        label="Banco *"
        class="col-sm-6 col-md-6"
        options-dense
      />
      <q-input
        label="Número de Cuenta *"
        v-model="data.bankAccount"
        lazy-rules
        outlined
        maxlength="20"
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
    </template>
  </sen-modal-form>
</template>

<script>
import { reactive, watchEffect, onUpdated, ref } from "vue";
import useAdmin from "src/modules/admin/composables/useAdmin";
export default {
  props: {
    modal: Boolean,
    currentItem: Object,
    handleSubmit: Function,
    closeModal: Function,
  },
  setup(props) {
    const banks = ref([]);
    const dataBanks = ref([]);
    const data = reactive({
      banks: "",
      bankAccount: "",
    });

    onUpdated(async () => {
      const { getBanksGeneral } = useAdmin();
      const data3 = await getBanksGeneral();
      //Datos de las ordenes del ususario

      //Bancos
      dataBanks.value = [];
      banks.value = [];
      dataBanks.value = data3.message.data;
      dataBanks.value.forEach((element) => {
        banks.value.push(element);
      });
    });

    return {
      banks,
      onUpdated,
      data,
    };
  },
};
</script>

<style>
</style>
