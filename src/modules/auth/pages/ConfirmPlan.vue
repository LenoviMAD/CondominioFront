<template>
  <q-page class="window-height window-width row justify-center items-center custom-bg">
    <q-card square class="q-pa-md shadow-24" style="width: 750px; margin: 0 auto">
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm q-mb-none">
          <q-btn
            flat
            icon="arrow_back"
            text-color="white"
            :to="{ name: 'plans' }"
            title="Atrás"
          />
          Confirmar plan
        </h4>
      </q-card-section>

      <q-card-section class="q-pb-none">
        <section id="planes" class="q-pb-lg">
          <div class="row q-col-sm">
            <q-tabs v-model="tab" class="col-sm-4 col-md-4 row q-pa-none full-width">
              <q-tab
                :name="timePlan.id"
                :label="currentItem.name"
                @click="eventClick(timePlan.id)"
                v-for="timePlan in timePlan"
              >
                <div>Tiempo: {{ timePlan.description }}</div>
                <!-- <div>Precio: {{ tab }}</div> -->
                <div>Precio: {{ currentItem.cost * timePlan.code }}</div>
              </q-tab>
              <!-- <q-tab name="alarms" icon="alarm" label="Alarms" />
          <q-tab name="movies" icon="movie" label="Movies" /> -->
            </q-tabs>

            <!-- <q-btn
          class="col-sm-4 col-md-4 row q-pa-none center selection"
          v-for="timePlan in timePlan"
          v-model="tab"
          :id="timePlan.id"
          @click="onclick"
        >
        </q-btn> -->
          </div>
          <div class="row q-col-gutter-sm q-px-sm" style="justify-content: space-evenly">
            <q-form
              class="row q-col-gutter-sm"
              :style="styleForm"
              @submit.prevent="onSubmit"
              @reset="onReset"
              ref="myForm"
            >
              <!-- Datos del ciente -->
              <h5 class="col-sm-12 col-md-12 center">Datos del Cliente</h5>

              <q-input
                label="Primer Nombre *"
                class="col-sm-6 col-md-6"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="data.name"
                outlined
                dense
              />
              <q-input
                label="Segundo Nombre"
                class="col-sm-6 col-md-6"
                v-model="data.secondName"
                outlined
                dense
              />
              <q-input
                label="Primer Apellido *"
                class="col-sm-6 col-md-6"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="data.surname"
                outlined
                dense
              />
              <q-input
                label="Segundo Apellido"
                class="col-sm-6 col-md-6"
                v-model="data.secondSurname"
                outlined
                dense
              />
              <q-select
                outlined
                dense
                label="Tipo de documento *"
                v-model="data.idTypeCI"
                :rules="[(val) => !!val || 'Campo requerido']"
                option-label="code"
                option-value="id"
                :options="typeCI"
                class="col-sm-2 col-md-2"
              ></q-select>
              <q-input
                label="Cédula *"
                :rules="[(val) => !!val || 'Campo requerido']"
                @keydown="filterKey('entero', $event)"
                v-model="data.cedula"
                class="col-sm-4 col-md-4"
                maxlength="8"
                type="text"
                outlined
                dense
              />
              <q-select
                outlined
                dense
                v-model="data.idAreaCodeLocalPhone"
                option-label="description"
                option-value="id"
                :options="optionAreaCodeLocal"
                label="Cód. Área"
                :rules="[(val) => !!val || 'Campo requerido']"
                class="col-sm-2 col-md-2"
              >
              </q-select>
              <q-input
                label="Teléfono Local *"
                class="col-sm-4 col-md-4"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="data.localphone"
                mask="### - ####"
                outlined
                dense
              />
              <q-select
                outlined
                dense
                v-model="data.idAreaCodePhone"
                option-label="description"
                option-value="id"
                :options="optionAreaCodeCell"
                label="Cód. Área"
                :rules="[(val) => !!val || 'Campo requerido']"
                class="col-sm-2 col-md-2"
              >
              </q-select>
              <q-input
                label="Teléfono Celular"
                class="col-sm-4 col-md-4"
                v-model="data.phone"
                mask="### - ####"
                outlined
                dense
              />
              <q-input
                outlined
                dense
                v-model="data.email"
                label="Correo Electrónico *"
                class="col-sm-6 col-md-6"
              />
              <!-- <q-input
                  outlined
                  dense
                  v-model="data.contract"
                  label="Cuenta Contrato* Contiene 10 digitos (Puede consultar el número de los SMS que enviamos con su saldo)"
                /> -->
              <q-card-section class="q-pt-none col-sm-12 col-md-12">
                <!-- Datos Transferencia -->
                <h5>Datos de la transferencia</h5>

                <!-- <div class="flex-column mb-20">
                  <q-option-group
                    v-model="group"
                    :options="options"
                    color="primary"
                  />
                </div> -->

                <div class="q-gutter-sm flex-column mb-20">
                  <q-radio
                    v-model="visible"
                    :val="true"
                    label="Transferencia en Bs."
                    class="w48"
                  />
                  <q-radio
                    v-model="visible"
                    :val="false"
                    :disable="true"
                    label="Transferencia en USD Zelle"
                    class="w48"
                  />
                </div>

                <!-- Bs -->
                <div v-show="visible" class="row q-col-gutter-md mb-20">
                  <q-input
                    label="Fecha de Transferencia"
                    stack-label
                    class="col-sm-6 col-md-6"
                    v-model="data.paymentDate"
                    type="date"
                    outlined
                    dense
                  />
                  <q-input
                    outlined
                    dense
                    readonly
                    @keydown="filterKey('decimal', $event)"
                    v-model="data.amount"
                    label="Monto cancelado (Bs.)*"
                    class="col-sm-6 col-md-6"
                  />

                  <q-select
                    outlined
                    dense
                    option-label="description"
                    option-value="id"
                    v-model="data.idBank"
                    :options="banks"
                    label="Banco Emisor*"
                    class="col-sm-6 col-md-6"
                  />
                  <!--
                  <q-input
                    outlined
                    dense
                    v-model="data.numberIdBs"
                    :label="labelTypeDocument"
                    class="col-sm-6 col-md-6"
                  /> -->

                  <q-input
                    outlined
                    dense
                    v-model="data.referenceNumber"
                    @keydown="filterKey('entero', $event)"
                    label="Número de referencia"
                    class="col-sm-6 col-md-6"
                    min="6"
                  />
                </div>

                <!-- Zelle -->
                <div v-show="visible == false">
                  <div class="flex space-between mb-20">
                    <q-input
                      outlined
                      dense
                      v-model="data.emailZelle"
                      label="Correo electronico del emisor del pago"
                      class="w48"
                    />
                    <q-input
                      outlined
                      dense
                      v-model="data.titularZelle"
                      label="Nombre del titular de la cuenta Zelle"
                      class="w48"
                    />
                  </div>
                  <div class="flex space-between mb-20">
                    <q-input
                      outlined
                      dense
                      @keydown="filterKey('decimal', $event)"
                      v-model="data.amountUsd"
                      label="Monto en USD$*"
                      class="w48"
                    />
                    <q-input
                      outlined
                      dense
                      v-model="data.confirmationZelle"
                      label="Número de confirmacion de Zelle*"
                      class="w48"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="col-sm-12 col-md-12 row">
                <h5>Adjuntar Print y/o capture (opcional)</h5>

                <q-file
                  outlined
                  dense
                  v-model="data.pathArchive"
                  label="Subir Archivo"
                  class="col-sm-6 col-md-6"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </q-card-section>

              <q-card-actions
                class="row q-col-gutter-sm q-px-smcol-sm-12 col-md-12 row f-flex"
              >
                <q-btn
                  color="primary"
                  class="col-sm-4 col-md-4"
                  icon-right="send"
                  label="Enviar"
                  type="submit"
                />
              </q-card-actions>
            </q-form>
            <!-- <q-card
              square
              class="shadow-24"
              style="width: 350px; margin: 0 auto"
            >
              <h5>Efectuar compra</h5>
              <q-form @submit.prevent="onSubmitConfirm" class="q-pb-none flex">
                <q-input
                  label="Email *"
                  v-model="data.email"
                  :rules="[(val) => !!val || 'Campo requerido']"
                  class="col-sm-12 col-md-12"
                  outlined
                  dense
                />

              </q-form>
            </q-card> -->
          </div>
        </section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useUI from "src/composables/useUI";
import useAuth from "../composables/useAuth";
// import {mapState}

export default {
  setup() {
    const $q = useQuasar();
    const { getTypeDocument, confirmPay, getBanks } = useAuth();
    const { modalOpen, toggleModal, getPhoneAreaCod, getCIType, filterKey } = useUI();
    const typeDocument = ref([]);
    const styleForm = ref("display: none;");
    const banks = ref([]);
    const tDocument = ref(null);
    const mBanks = ref(null);
    const typeCI = ref([]);
    const router = useRouter();
    const store = useStore();
    const visible = ref(null);
    const tab = ref(null);
    const optionAreaCodeLocal = reactive([]);
    const optionAreaCodeCell = reactive([]);

    const timePlan = computed(() => store.state["ui"].timePlan);

    const labelTypeDocument = ref("Número de Cédula");
    const data = reactive({
      email: "",
      name: "",
      secondName: "",
      surname: "",
      secondSurname: "",
      idAreaCodePhone: [],
      phone: "",
      idAreaCodeLocalPhone: [],
      localphone: "",
      idTypeCI: "",
      cedula: "",
      indicator: "",
      paymentDate: "",
      amount: "",
      phones: [],
      idPlan: "",
      idTime: "",
      idBank: "",
      referenceNumber: "",
      pathArchive: [],

      emailClient: "", //Cambiarlo luego de eliminar la parte de efectuar compra para que de aqui o del zelle le llegue el email
      titularZelle: "",
      amountUsd: "",
      confirmationZelle: "",
      referenceNumber: "",
    });

    const currentItem = computed(() => store.state["ui"].currentItem);

    onMounted(async () => {
      var { ok, message } = await getTypeDocument();
      typeDocument.value = message.data;

      const dataTypeCI = await getCIType();
      typeCI.value = dataTypeCI.message.data;

      const dataAreaCode = await getPhoneAreaCod();
      dataAreaCode.message.data.forEach((element) => {
        if (element.code == "1") {
          optionAreaCodeLocal.push({
            id: element.id,
            description: element.description,
          });
        } else {
          optionAreaCodeCell.push({
            id: element.id,
            description: element.description,
          });
        }
      });

      message = await getBanks();
      banks.value = message.message.data;
      console.log(currentItem.value.id, "currentItem");
    });
    //  "N de C.I. o RIF del titular de la cuenta desde donde se hizo la transferencia"
    return {
      labelTypeDocument,
      modalOpen,
      toggleModal,
      typeDocument,
      banks,
      tDocument,
      tab,
      filterKey,
      mBanks,
      styleForm,
      options: [],
      visible,
      typeCI,
      currentItem,
      timePlan,
      optionAreaCodeLocal,
      optionAreaCodeCell,
      dialog: ref(false),
      maximizedToggle: ref(true),
      // shape: ref("line"),
      model: ref(null),
      data,
      onMounted,
      // Acciones para el guardado
      // name,
      // age,
      // accept,
      // onSubmitConfirm: async () => {
      //   console.log(data);
      //   const { ok, message } = await confirmPay(data);

      //   console.log(message, ok);

      //   if (!ok) Swal.fire("Error", message, "error");
      //   else {
      //     Swal.fire("Registrado", message.message, "success");
      //     router.push({ name: "login" });
      //   }
      // },
      onSubmit: async () => {
        if (visible.value == true) {
          data.indicator = "1";
        } else {
          data.indicator = "2";
        }
        data.idTime = tab.value;
        data.idPlan = currentItem.value.id;

        //Para los telefonos el typePhone es 73 para locales y 74 para celulares, entitySubClass
        data.phones.push({
          idTypePhone: 73,
          idAreaCode: data.idAreaCodeLocalPhone.id,
          number: data.localphone,
        });

        data.phones.push({
          idTypePhone: 74,
          idAreaCode: data.idAreaCodePhone.id,
          number: data.phone,
        });
        console.log(data);
        const { ok, message } = await confirmPay(data);
        console.log(message);
        if (!ok)
          $q.notify({
            message: message.message != null ? message.message : message,
            color: "negative",
            icon: "error",
          });
        else {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });
          router.push({ name: "login" });
        }
      },
      eventClick: async (id) => {
        styleForm.value = "";
        timePlan.value.forEach((element) => {
          if (element.id == id) {
            console.log(element, "elemento");
            data.amount = currentItem.value.cost * element.code;
          }
        });
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },

      //       filterFn(val, update) {
      //         if (val === "") {
      //           update(() => {
      //             optionAreaCode.value = optionAreaCode;

      //             // here you have access to "ref" which
      //             // is the Vue reference of the QSelect
      //           });
      //           return;
      //         }

      //         update(() => {
      //           const needle = val.toLowerCase();
      //           optionAreaCode.value = optionAreaCode.filter(
      //             (v) => v.toLowerCase().indexOf(needle) > -1
      //           );
      //         });
      //       },

      date: ref(null),

      // Options
      // group: ref("op1"),

      options: [
        {
          label: "Transferencia en Bs",
          value: "op1",
        },
        {
          label: "Transferencia en USD Zelle",
          value: "op2",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.mb-color {
  background-color: #1e232d;
}

.f-flex {
  display: flex;
  justify-content: center;
}
.t-color {
  color: #1976d2;
}

.w48 {
  width: 48%;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.space-between {
  justify-content: space-between;
}

.mb-20 {
  margin-bottom: 0px;
}

.custom-bg {
  background: url(~assets/top-view.jpg) no-repeat center center fixed;
  background-size: cover;
  overflow: scroll;
}
.custom-bg-primary {
  background-color: #1e232d;
}

// cool selector CSS
$height: 36px;
$overall-width: 360px;
$secondary-transparent: rgba(32, 45, 59, 0.2);
$inactive-text: #000000;
$primary-transparent: rgba(91, 150, 213, 0.2);
$active-text: #000000;

.selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer; // to flexbox this will keep all widths the same. flexbox is just funny l
  background-clip: border-box;
  transform: scale3d(1, 1, 1); // weird hack to prevent pixel-y borders

  // make it pretty!
  background: $secondary-transparent;
  border: 1px solid $secondary;
  color: $inactive-text;
  transition: 0.15s ease-in-out background-color;
  &.selected {
    background: $primary-transparent !important;
    border-color: $primary;
    color: $active-text !important;
    z-index: 2; // this is to make sure the active border is always on top. make sure to not animate this if you are using transition effects!
    cursor: text; // makes the "active" block look unclickable. now that's good UX!
  }

  &:hover {
    color: lighten($primary, 20%);
    background: transparentize($primary-transparent, 0.15);
  }

  // add some borders!
  &:first-child {
    margin-left: 0; // this is just to counter-act the margin-left: -1px trick
    border-radius: 3px 0 0 3px;
  }
  &:last-child {
    border-radius: 0 3px 3px 0;
  }
}
</style>
