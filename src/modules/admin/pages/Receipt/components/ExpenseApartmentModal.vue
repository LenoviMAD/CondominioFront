<template>
  <q-dialog
    v-model="modal"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <div class="col-sm-12 col-md-12 flex-column full-center row q-mb-md">
        <q-card-section class="custom-bg-primary full-width text-center">
          <h4 class="text-white q-my-sm">Creación de gastos no común</h4>
        </q-card-section>
      </div>
      <section>
        <div class="row full-width q-col-gutter-md q-pb-lg">
          <div class="col-sm-4 col-md-4 title-div full-center">Item</div>
          <div class="col-sm-2 col-md-2 title-div">Valor total Gastos Bs</div>
          <div class="col-sm-2 col-md-2 title-div">Valor total Gastos $</div>
          <div class="col-sm-4 col-md-4 title-div">
            Valor total Gastos Según alicuota $
          </div>
        </div>
        <div
          class="row full-width q-col-gutter-md q-pb-lg"
          v-for="(item, index) in data"
          :key="index"
        >
          <div class="col-sm-4 col-md-4 row">
            <div v-if="index + 1 < data.length" class="col-sm-2 col-md-2 q-pt-sm q-pl-lg">
              <q-btn
                @click="toggleModalVoucher()"
                push
                color="grey"
                size="sm"
                round
                icon="cloud_upload"
              >
                <q-tooltip> Crear comprobante </q-tooltip>
              </q-btn>
            </div>
            <div v-else class="col-sm-2 col-md-2 q-pt-sm q-pl-lg"></div>
            <q-input
              v-model="item.item"
              label="Item"
              class="col-sm-6 col-md-6"
              outlined
              dense
            />
            <div
              class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm"
              v-if="index + 1 < data.length"
            >
              <q-btn push color="light-green-4" size="sm" round icon="save">
                <q-tooltip> Guardar </q-tooltip>
              </q-btn>
              <q-btn push color="orange-4" size="sm" round icon="edit"
                ><q-tooltip> Editar </q-tooltip>
              </q-btn>
              <q-btn
                push
                color="red-4"
                size="sm"
                @click="deleteItem(index)"
                round
                icon="close"
                ><q-tooltip> Cancelar </q-tooltip>
              </q-btn>
            </div>
            <div class="col-sm-4 col-md-4 q-gutter-sm q-pa-sm" v-else>
              <q-btn
                push
                color="light-blue-10"
                size="sm"
                round
                icon="add"
                @click="eventClickAddItem()"
              >
                <q-tooltip> Agregar </q-tooltip>
              </q-btn>
            </div>
          </div>
          <q-input
            label="Gastos Bs"
            class="col-sm-2 col-md-2"
            readonly
            v-model="item.bs"
            :rules="[(val) => !!val || 'Campo requerido']"
            outlined
            dense
          />
          <q-input
            label="Gastos $"
            v-model="item.usd"
            class="col-sm-2 col-md-2"
            readonly
            :rules="[(val) => !!val || 'Campo requerido']"
            outlined
            dense
          />
          <q-select
            outlined
            v-model="item.billAliquot"
            dense
            label="Gastos Según alicuota"
            class="col-sm-3 col-md-3"
          />
          <div v-if="index + 1 < data.length" class="col-sm-1 col-md-1 q-pa-lg">
            <q-btn
              push
              color="grey"
              @click="toggleModalDivision()"
              size="12px"
              round
              icon="donut_small"
            >
              <q-tooltip> Division </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="row full-width q-pr-md justify-end">
          <q-input
            label="Sub Total a Pagar"
            class="col-sm-2 col-md-2"
            readonly
            :rules="[(val) => !!val || 'Campo requerido']"
            outlined
            dense
          />
        </div>
      </section>
    </q-card>
  </q-dialog>
  <voucher-modal
    :modal="modalVoucher"
    :closeModal="toggleModalVoucher"
    :currentItem="currentItem"
  />
  <division-item-modal
    :modal="modalDivision"
    :closeModal="toggleModalDivision"
    :currentItem="currentItem"
  />
</template>

<script>
import { reactive, watchEffect, ref } from "vue";

//Componentes importados
import VoucherModal from "./VoucherModal.vue";
import DivisionItemModal from "./DivisionItemModal.vue";

export default {
  props: {
    modal: Boolean,
    currentItem: Object,
    closeModal: Function,
  },
  components: { VoucherModal, DivisionItemModal },
  setup(props) {
    const modalVoucher = ref(false);
    const toggleModalVoucher = () => {
      modalVoucher.value = !modalVoucher.value;
    };
    const modalDivision = ref(false);
    const toggleModalDivision = () => {
      modalDivision.value = !modalDivision.value;
    };
    const data = reactive([
      {
        item: "",
        bs: "",
        usd: "",
        billAliquot: "",
      },
    ]);

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
      modalVoucher,
      toggleModalVoucher,
      modalDivision,
      toggleModalDivision,

      name: ref(""),
      lastname: ref(""),
      email: ref(""),
      phone: ref(""),
      password: ref(""),
      confirmPassword: ref(""),
      ci: ref(""),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      maximizedToggle: ref(true),
      deleteItem: (index) => {
        data.splice(index, 1);
      },
      eventClickAddItem: () => {
        data.push({
          item: "",
          bs: "",
          usd: "",
          billAliquot: "",
        });
      },
    };
  },
};
</script>

<style></style>
