<template>
  <section class="section row flex-column full-width q-col-gutter-md">
    <header class="text-center col-md-12">
      <h3 class="q-my-sm text-weight-light">Registro de pago {{ nameResident }}</h3>
    </header>
    <div class="row flex-column full-width">
      <q-select
        outlined
        class="col-md-5 mb-20"
        v-model="data.receive"
        :options="dataReceive"
        option-label="number"
        option-value="id"
        label="Recibo por pagar"
        @update:model-value="changeReceive(data.receive)"
      />
    </div>

    <div class="row full-width q-col-gutter-md">
      <q-input
        label="Total Bs"
        readonly
        v-model="amountTotalBs"
        lazy-rules
        outlined
        type="text"
        class="col-sm-6 col-md-6"
        suffix="Bs."
      />
      <q-input
        label="Total $"
        readonly
        v-model="amountTotalUsd"
        lazy-rules
        outlined
        type="text"
        class="col-sm-6 col-md-6"
        suffix="$"
      />
      <q-input
        label="Fecha de Recibo"
        stack-label
        readonly
        class="col-sm-6 col-md-6"
        :rules="[(val) => !!val || 'Campo requerido']"
        v-model="receiveDate"
        type="date"
        outlined
      />
      <q-select
        outlined
        v-model="data.paymentMethods"
        :options="paymentMethods"
        option-label="description"
        option-value="id"
        label="Método de pago"
        class="col-sm-6 col-md-6"
        options-dense
        @update:model-value="changePaymentsMethods(data.paymentMethods)"
      />
    </div>
    <!-- Transferencia -->
    <section
      v-if="data.paymentMethods.id == 151 || data.paymentMethods.id == 152"
      class="row full-width q-col-gutter-md"
    >
      <div class="row full-width" v-if="data.paymentMethods.id == 151">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Datos Bancarios</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p><strong>Banco:</strong> {{ dataBankResidence.nameBank }}</p>
            <p><strong>Número de cuenta:</strong> {{ dataBankResidence.bankAccount }}</p>
            <p><strong>Tipo de cuenta:</strong> {{ dataBankResidence.typeAccount }}</p>
            <p>
              <strong>RIF:</strong> {{ dataBankResidence.typeRif }}-{{
                dataBankResidence.rif
              }}
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="row full-width" v-else-if="data.paymentMethods.id == 152">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Datos Bancarios</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p><strong>Banco:</strong> {{ dataBankResidence.nameBank }}</p>
            <p>
              <strong>Número de Telefono:</strong> {{ dataBankResidence.typePhone }}
              {{ dataBankResidence.phoneNumber }}
            </p>
            <p>
              <strong>RIF:</strong> {{ dataBankResidence.typeRif }}-{{
                dataBankResidence.rif
              }}
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="row q-col-gutter-md">
        <q-input
          label="Nombre del titular *"
          v-model="data.titular"
          lazy-rules
          outlined
          :rules="[(val) => !!val || 'El campo es requerido']"
          type="text"
          class="col-sm-6 col-md-6"
        />
        <q-input
          label="Cédula *"
          v-model="data.ci"
          lazy-rules
          outlined
          :rules="[(val) => !!val || 'El campo es requerido']"
          type="text"
          class="col-sm-6 col-md-6"
        />
        <q-input
          :label="paymentsInstrument"
          v-model="data.paymentInstrument"
          lazy-rules
          outlined
          :rules="[(val) => !!val || 'El campo es requerido']"
          type="text"
          class="col-sm-6 col-md-6"
        />
        <q-select
          outlined
          v-model="data.bank"
          :options="banks"
          option-label="description"
          option-value="id"
          label="Banco *"
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
          :rules="[(val) => !!val || 'Campo requerido']"
          v-model="data.paidDay"
          type="date"
          outlined
        />
        <q-input
          label="Monto pagado (Bs)"
          v-model="data.amountPaidBs"
          class="col-sm-6 col-md-6"
          @keydown="filterKey('decimal', $event)"
          :rules="[(val) => !!val || 'Campo requerido']"
          outlined
        />
      </div>
    </section>

    <!-- Pago en Efectivo -->
    <section
      v-else-if="data.paymentMethods.id == 154"
      class="row full-width q-col-gutter-md"
    >
      <q-input
        label="Nombre del titular *"
        v-model="data.titular"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Cedula *"
        v-model="data.ci"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
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
        :rules="[(val) => !!val || 'Campo requerido']"
        v-model="data.paidDay"
        type="date"
        outlined
      />
      <q-input
        label="Monto pagado (Bs)"
        v-model="data.amountPaidBs"
        class="col-sm-6 col-md-6"
        @keydown="filterKey('decimal', $event)"
        :rules="[(val) => !!val || 'Campo requerido']"
        outlined
      />
    </section>

    <!-- Zelle -->
    <section
      v-else-if="data.paymentMethods.id == 153"
      class="row full-width q-col-gutter-md"
    >
      <q-input
        label="Correo electronico del emisor del pago *"
        v-model="data.emailZelle"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Nombre del titular de la cuenta Zelle *"
        v-model="data.titular"
        lazy-rules
        outlined
        :rules="[(val) => !!val || 'El campo es requerido']"
        type="text"
        class="col-sm-6 col-md-6"
      />
      <q-input
        label="Monto pagado ($)"
        v-model="data.amountPaidUsd"
        class="col-sm-6 col-md-6"
        @keydown="filterKey('decimal', $event)"
        :rules="[(val) => !!val || 'Campo requerido']"
        outlined
        lazy-rules
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
    </section>
    <div class="space-around col-sm-12 col-md-12 q-mt-md row" v-if="data.paymentMethods">
      <q-btn class="col-sm-2" color="positive" label="Crear" @click="onSubmit()" />

      <q-btn class="col-sm-2" color="negative" label="Cancelar" />
    </div>
  </section>
</template>

<script>
import { reactive, ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import useUI from "src/composables/useUI";
import useUser from "src/modules/user/composables/useUser";
import useAuth from "src/modules/auth/composables/useAuth";

export default {
  el: "#app",
  setup() {
    const {
      filterKey,
      getValueUSD,
      getValueUSDRepuesto,
      getPaymentMethods,
      getBanksDataResidence,
    } = useUI();
    const { getReceiptByIdUser, savePayment } = useUser();
    const { getBanks } = useAuth();
    const $q = useQuasar();
    const store = useStore();
    const amountTotalBs = ref("");
    const amountTotalUsd = ref("");
    const receiveDate = ref("");
    const dataBankResidence = reactive({
      nameBank: "",
      typeAccount: "",
      typeRif: "",
      rif: "",
      bankAccount: "",
      typePhone: "",
      phoneNumber: "",
    });
    const paymentsInstrument = ref("");
    const banks = ref([]);
    const data = reactive({
      receive: "",
      idPaymentRecord: "",
      paymentMethods: "",
      idPaymentMethod: "",
      titular: "",
      ci: "",
      paymentInstrument: "",
      bank: "",
      idBank: "",
      nReference: "",
      paidDay: "",
      amountPaidBs: "",
      amountPaidUsd: "",
    });
    const paymentMethods = ref([]);
    const dataSelected = ref([]);
    const dataReceive = reactive([]);
    const nameResident = ref("");

    onMounted(async () => {
      const idUser = store.state["auth"].id;
      const idResidential = store.state["auth"].currentResidential.idResidential;

      var { ok, message } = await getPaymentMethods();
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
      //Datos de todos los bancos
      message = await getBanks();
      banks.value = message.message.data;

      //Datos bancarios de la Residencia
      console.log(idResidential);
      const banksDataResidenceResp = await getBanksDataResidence(idResidential);

      console.log(banksDataResidenceResp, "message");
      dataBankResidence.nameBank = banksDataResidenceResp.message.data.bank;
      dataBankResidence.bankAccount = banksDataResidenceResp.message.data.bankAccount;
      dataBankResidence.typeAccount = banksDataResidenceResp.message.data.typeAccount;
      dataBankResidence.typeRif = banksDataResidenceResp.message.data.typeRif;
      dataBankResidence.rif = banksDataResidenceResp.message.data.rif;
      dataBankResidence.typePhone = banksDataResidenceResp.message.data.typePhone;
      dataBankResidence.phoneNumber = banksDataResidenceResp.message.data.number;
    });

    return {
      onMounted,
      dataReceive,
      dataSelected,
      nameResident,
      paymentMethods,
      data,
      amountTotalBs,
      amountTotalUsd,
      receiveDate,
      paymentsInstrument,
      banks,
      filterKey,
      dataBankResidence,
      changeReceive: (dataReceive) => {
        console.log(dataReceive);
        receiveDate.value = dataReceive.date;
        amountTotalBs.value = dataReceive.amountPaymentBs;
        amountTotalUsd.value = dataReceive.amountPaymentUsd;
      },
      changePaymentsMethods: (paymentMethod) => {
        console.log(paymentMethod.description);
        if (paymentMethod.id == 152) {
          paymentsInstrument.value = "Número de Teléfono";
        } else if (paymentMethod.id == 151) {
          paymentsInstrument.value = "Número de cuenta";
        }
      },
      onSubmit: async () => {
        try {
          $q.loading.show();
          dataReceive.forEach((element) => {
            if (element.id == data.receive.id) {
              data.idPaymentRecord = element.id;
              return;
            }
          });
          data.idPaymentMethod = data.paymentMethods.id;
          data.idBank = data.bank.id;
          console.log(amountTotalBs.value);
          if (data.amountPaidBs == amountTotalBs.value.toString()) {
            data.amountPaidUsd = amountTotalUsd.value;
          }

          const { ok, message } = await savePayment(data);
          arrSend.receiptDetail = [];
          $q.loading.hide();
          if (ok) {
            $q.notify({
              message: message.message,
              color: "positive",
              icon: "check_circle",
            });
            router.push({ name: "PaymentsRecordClient" });
          } else {
            $q.notify({
              message: message.message != null ? message.message : message,
              color: "negative",
              icon: "error",
            });
          }
        } catch (error) {
          if (error.message != "Network Error") {
            return { ok: false, message: error.message };
          } else {
            return { ok: false, message: "La API no esta activa" };
          }
        }
      },
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
