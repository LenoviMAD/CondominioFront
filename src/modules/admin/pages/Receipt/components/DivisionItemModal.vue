<template>
  <q-dialog v-model="modal" @show="onShow()" @hide="closeModal()">
    <div class="section row" style="min-width: 820px">
      <div class="col-sm-12 col-md-12 flex-column full-center row q-mb-md">
        <q-card-section class="custom-bg-primary full-width text-center">
          <h4 class="text-white q-my-sm">Fraccionamiento de Ítem</h4>
        </q-card-section>
      </div>
      <div class="col-md-12 row q-col-gutter-md">
        <q-input
          label="Ítem"
          v-model="data.item"
          :rules="[(val) => !!val || 'Campo requerido']"
          class="col-sm-6 col-md-6"
          outlined
          readonly
          dense
        />
        <q-select
          outlined
          dense
          label="Fracción de la cuota"
          :options="optionQuota"
          v-model="data.installmentFraction"
          @update:model-value="onChangeQuota(data.installmentFraction)"
          class="col-sm-6 col-md-6"
        />
        <q-input
          label="Fecha de Inicio"
          stack-label
          readonly
          v-model="data.startDate"
          class="col-sm-6 col-md-6"
          :rules="[(val) => !!val || 'Campo requerido']"
          type="date"
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-input
          label="Fecha del Cierre"
          v-model="data.endDate"
          stack-label
          readonly
          class="col-sm-6 col-md-6"
          :rules="[(val) => !!val || 'Campo requerido']"
          type="date"
          outlined
          dense
        >
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-input
          label="Descripcion"
          v-model="data.description"
          :rules="[(val) => (!!val && val.length > 3) || 'Campo requerido']"
          class="col-sm-6 col-md-6"
          outlined
          dense
        />
        <q-input
          label="Montos de las cuotas Bs"
          v-model="data.amountInstallmentBs"
          class="col-sm-3 col-md-3"
          suffix="Bs"
          :rules="[(val) => !!val || 'Campo requerido']"
          outlined
          readonly
          dense
        />
        <q-input
          label="Montos de las cuotas USD"
          v-model="data.amountInstallmentUsd"
          class="col-sm-3 col-md-3"
          suffix="$"
          :rules="[(val) => !!val || 'Campo requerido']"
          outlined
          readonly
          dense
        />
        <div class="full-center col-sm-12 col-md-12 row">
          <q-input
            label="Número del recibo de creación"
            v-model="data.receiveNumber"
            class="col-sm-4 col-md-4"
            :rules="[(val) => !!val || 'Campo requerido']"
            outlined
            readonly
            dense
          />
        </div>
        <div class="space-around col-sm-12 col-md-12 row">
          <q-btn class="col-sm-2" color="positive" label="Crear" @click="onSubmit()" />
          <q-btn
            class="col-sm-2"
            color="negative"
            label="Cancelar"
            @click="closeModal()"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { reactive, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import useUI from "src/composables/useUI";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";

export default {
  props: {
    modal: Boolean,
    currentItem: Object,
    closeModal: Function,
  },
  setup(props) {
    const data = reactive({
      item: "",
      installmentFraction: "",
      startDate: "",
      endDate: "",
      description: "",
      amountInstallmentBs: "",
      amountInstallmentUsd: "",
      receiveNumber: "",
    });
    const $q = useQuasar();
    const optionQuota = ref([]);
    const {
      filterKey,
      firstCero,
      getPhoneAreaCod,
      getRifType,
      getChargesMethods,
    } = useUI();
    const store = useStore();

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
      optionQuota,
      onShow: async () => {
        data.item = data[0]["item"];
        data.price = data[0]["bs"];
        data.priceUsd = data[0]["usd"];
        data.receiveNumber = data[0]["nroReceipt"];
        data.favorite = false;

        data.startDate = new Date().toISOString().substr(0, 10);

        //Se hizo con variable por si se agrega una propiedad en una tabla de base de datos para hacerla linkeada
        const monthOption = 36;
        for (let index = 1; index < monthOption; index++) {
          optionQuota.value[index] = index + 1;
        }
      },

      onChangeQuota: async (quota) => {
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
        var day = date.getDate();
        console.log(month, data.startDate);
        for (let index = 0; index < quota; index++) {
          month++;
          if (month > 12) {
            month = 1;
            year++;
          }
        }
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        data.endDate = year + "-" + month + "-" + day;
        console.log(data.price, quota);
        data.amountInstallmentBs = (data.price / quota).toFixed(4);
        data.amountInstallmentUsd = (data.priceUsd / quota).toFixed(4);
      },
      onSubmit: async () => {
        try {
          $q.loading.show();

          console.log(data, "data Voucher");
          store.commit("admin/receipt/addDivision", data);

          $q.loading.hide();

          $q.notify({
            message: "Fraccionamiento guardado correctamente",
            color: "positive",
            icon: "check_circle",
          });

          props.closeModal(data.item);
          data.idTypeRif = [];
          data.idAreaCode = [];
          data.idChargesMethods = [];
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

<style></style>
