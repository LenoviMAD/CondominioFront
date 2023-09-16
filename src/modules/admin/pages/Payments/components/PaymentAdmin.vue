<template>
  <section class="section row flex-column full-width">
    <header class="text-center col-md-12">
      <h3 class="q-my-sm text-weight-light">Registro de pago {{ nameResident }}</h3>
    </header>
    <div class="row flex-column full-width">
      <q-select
        outlined
        dense
        class="col-md-5 mb-20"
        v-model="data.idOrder"
        :options="dataReceive"
        option-label="number"
        option-value="id"
        label="Recibo por pagar"
      />
    </div>

    <div class="row full-width q-col-gutter-md">
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
    </div>
  </section>
</template>

<script>
import { reactive, ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import useUI from "src/composables/useUI";
import useUser from "src/modules/user/composables/useUser";

export default {
  el: "#app",
  setup() {
    const { filterKey, getValueUSD, getValueUSDRepuesto, getPaymentMethods } = useUI();
    const { getReceiptByIdUser } = useUser();
    const $q = useQuasar();
    const store = useStore();
    const data = reactive({
      idOrder: "",
      banksAdmin: "",
      banks: "",
      nReference: "",
      amount: "",
      amountTotal: "",
    });
    const paymentMethods = ref([]);
    const dataSelected = ref([]);
    const dataReceive = reactive([]);
    const nameResident = ref("");

    onMounted(async () => {
      const idUser = store.state["auth"].id;

      const { ok, message } = await getPaymentMethods();
      console.log(message.data);
      //Metodos de pago
      paymentMethods.value = message.data;

      //Facturas a pagar
      const dataReceiveArr = await getReceiptByIdUser(idUser);
      console.log(dataReceiveArr, "dataReceiveArr");
      const receiveArr = dataReceiveArr.message.data;
      receiveArr.forEach((element) => {
        if (element.status == "Pendiente por pagar") {
          dataReceive.push(element);
        }
      });
      console.log(dataReceive);
    });

    return {
      onMounted,
      dataReceive,
      dataSelected,
      nameResident,
      paymentMethods,
      data,
    };
  },
};
</script>

<style lang="scss">
.custom-bg {
  background-image: url(~assets/top-view.jpg);

  background-size: cover;
}

.q-stepper__dot {
  font-size: 14px;
  width: 24px;
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  background: currentColor;
}
.q-stepper__dot span {
  font-size: 2em;
}

/* Color de la linea del stepper */
.q-stepper--horizontal .q-stepper__line:before,
.q-stepper--horizontal .q-stepper__line:after {
  background: #1566fc !important;
}

/* Estilos muy especificos para check */
.q-btn-group--push > .q-btn--push.q-btn--actionable {
  padding-left: 5px;
  border-radius: 2px;
  border: none;
  box-shadow: none;
  padding: 25px;
  width: 250px;
  flex-grow: 0;
}

.step-3-registry.q-btn-group {
  justify-content: space-evenly;
}
.my-special-class {
  background: #1e232d;
}
.div-tower {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
