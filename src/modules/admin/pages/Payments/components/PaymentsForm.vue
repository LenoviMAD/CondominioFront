<template>
  <sen-modal-form
    :modal="modal"
    :handleSubmit="() => handleSubmit(data)"
    :closeModal="closeModal"
    :currentItem="currentItem"
    modalLabel="Pagos"
  >
    <template v-slot:modalName> Agregar Pago </template>
    <template v-slot:modalIputs>
      <q-select
        outlined
        v-model="data.idOrder"
        :options="numberOrder"
        option-label="numberOrder"
        option-value="id"
        label="Número de Factura a pagar *"
        class="col-sm-6 col-md-6"
        options-dense
        @update:model-value="changeNumberOrder()"
      />
      <q-input
        label="Total Bs"
        readonly
        v-model="data.idOrder"
        lazy-rules
        outlined
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Total $"
        readonly
        v-model="data.amountTotal"
        lazy-rules
        outlined
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-select
        outlined
        v-model="data.idOrder"
        :options="paymentMethods"
        option-label="description"
        option-value="id"
        label="Método de pago"
        class="col-sm-6 col-md-6"
        options-dense
        @update:model-value="changeNumberOrder()"
      />
      <!-- Transferencia -->
      <q-input
        label="Nombre del titular *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Número de cuenta *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-select
        outlined
        v-model="data.banksAdmin"
        :options="banksAdmin"
        option-label="bankAccount"
        option-value="id"
        label="Tipo de cuenta *"
        class="col-sm-6 col-md-6"
        options-dense
      />
      <q-input
        label="Número de Referencia *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Fecha de Pago"
        stack-label
        class="col-sm-6 col-md-6"
        :readonly="readonly"
        :rules="[(val) => !!val || 'Campo requerido']"
        v-model="data.birthday"
        type="date"
        outlined
        dense
      />
      <q-input
        label="Monto pagado (Bs)"
        v-model="data.bs"
        :readonly="data.voucherSave"
        class="col-sm-2 col-md-2"
        @keydown="filterKey('decimal', $event)"
        :rules="[(val) => !!val || 'Campo requerido']"
        outlined
        dense
      />
      <!-- Pago movil -->
      <q-input
        label="Nombre del titular *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Número de teléfono *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />

      <q-input
        label="Cédula *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-select
        outlined
        v-model="data.banks"
        :options="banks"
        option-label="description"
        option-value="id"
        label="Banco  *"
        class="col-sm-6 col-md-6"
        options-dense
      />
      <q-input
        label="Fecha de Pago"
        stack-label
        class="col-sm-6 col-md-6"
        :readonly="readonly"
        :rules="[(val) => !!val || 'Campo requerido']"
        v-model="data.birthday"
        type="date"
        outlined
        dense
      />
      <q-input
        label="Monto pagado (Bs)"
        v-model="data.bs"
        :readonly="data.voucherSave"
        class="col-sm-2 col-md-2"
        @keydown="filterKey('decimal', $event)"
        :rules="[(val) => !!val || 'Campo requerido']"
        outlined
        dense
      />
      <q-input
        label="Ultimos digitos de Referencia *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <!-- Zelle -->

      <q-input
        label="Correo electronico del emisor del pago *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Nombre del titular de la cuenta Zelle *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Monto pagado ($)"
        v-model="data.bs"
        :readonly="data.voucherSave"
        class="col-sm-2 col-md-2"
        @keydown="filterKey('decimal', $event)"
        :rules="[(val) => !!val || 'Campo requerido']"
        outlined
        dense
      />
      <q-input
        label="Numero de confirmacion de Zelle *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <!-- Efectivo -->
      <q-input
        label="Numero de comprobante *"
        v-model="data.nReference"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Fecha de Pago"
        stack-label
        class="col-sm-6 col-md-6"
        :readonly="readonly"
        :rules="[(val) => !!val || 'Campo requerido']"
        v-model="data.birthday"
        type="date"
        outlined
        dense
      />
      <q-input
        label="Monto pagado ($)"
        v-model="data.bs"
        :readonly="data.voucherSave"
        class="col-sm-2 col-md-2"
        @keydown="filterKey('decimal', $event)"
        :rules="[(val) => !!val || 'Campo requerido']"
        outlined
        dense
      />
    </template>
  </sen-modal-form>
</template>

<script>
import { reactive, watchEffect, ref, computed, onUpdated } from "vue";

import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import useUI from "src/composables/useUI";

export default {
  props: {
    modal: Boolean,
    currentItem: Object,
    handleSubmit: Function,
    closeModal: Function,
  },
  setup(props) {
    const { filterKey, getValueUSD, getValueUSDRepuesto, getPaymentMethods } = useUI();

    const store = useStore();
    const data = reactive({
      idOrder: "",
      banksAdmin: "",
      banks: "",
      nReference: "",
      amount: "",
      amountTotal: "",
    });

    const changeNumberOrder = () => {
      if (data.idOrder.numberOrder != null) {
        data.amountTotal = dataOrder.value.find(
          (element) => element.numberOrder == data.idOrder.numberOrder
        ).amount;
        if (data.amountTotal == 0) {
          data.amountTotal = store.state["client"]["payClient"].items.find(
            (element) => element.numberOrder == data.idOrder.numberOrder
          ).amount;
        }
      }
    };

    const numberOrder = ref([]);
    const paymentMethodsArr = ref([]);
    const banks = ref([]);
    const banksAdmin = ref([]);
    const paymentMethods = ref([]);

    const amountTotal = computed(() => {
      if (data.idOrder.numberOrder != null) {
        const result = dataOrder.value.find(
          (element) => element.numberOrder == data.idOrder.numberOrder
        ).amount;
        console.log(result.length, result);
        if (result.length == 0) {
          result = store.state["client"]["payClient"].items.find(
            (element) => element.numberOrder == data.idOrder.numberOrder
          ).amount;
        }

        return result;
      }
    });

    //     // Actualizar estado local con el current item
    //     watchEffect(() => {
    //       if (Object.values(props.currentItem).length) {
    //         Object.assign(data, props.currentItem);
    //       } else {
    //         Object.keys(data).forEach((key) => {
    //           data[key] = "";
    //         });
    //       }
    //     });

    onUpdated(async () => {
      const idUser = store.state["auth"].id;

      const { ok, message } = await getPaymentMethods();
      console.log(message.data);
      //Metodos de pago
      paymentMethods.value = [];
      paymentMethods.value = message.data;
      paymentMethodsArr.value.forEach((element) => {
        paymentMethods.value.push(element);
      });
    });

    return {
      // onMounted,
      changeNumberOrder,
      onUpdated,
      filterKey,
      amountTotal,
      numberOrder,
      paymentMethods,
      paymentMethodsArr,
      data,
      banks,
      banksAdmin,
    };
  },
};
</script>

<style></style>
