<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="modalOpen"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
      maximized
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" @click="toggleModal">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form @submit="onSubmit" @reset="onReset" class="f-flex">
          <div style="width: 70%">
            <q-card-section>
              <div class="text-h4 text-bold text-center t-color">
                Reporte aqui su transferencia
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <!-- Datos del ciente -->
              <h5>Datos del Cliente</h5>
              <div class="flex space-between mb-20">
                <q-input
                  filled
                  v-model="data.name"
                  label="Nombre*"
                  class="w48"
                />
                <q-input
                  filled
                  v-model="data.surname"
                  label="Apellido*"
                  class="w48"
                />
              </div>
              <div class="flex space-between mb-20">
                <q-input
                  filled
                  v-model="data.phone"
                  label="Teléfono* (Sin guiones o espacios)"
                  class="w48"
                />
                <q-input
                  filled
                  v-model="data.localphone"
                  label="Teléfono Secundario (Sin guiones o espacios)"
                  class="w48"
                />
              </div>
              <q-input
                filled
                v-model="data.emailClient"
                label="Correo Electrónico*"
                class="mb-20"
              />
              <q-input
                filled
                v-model="data.contract"
                label="Cuenta Contrato* Contiene 10 digitos (Puede consultar el número de los SMS que enviamos con su saldo)"
                class="mb-20"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
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
                  label="Transferencia en USD Zelle"
                  class="w48"
                />
              </div>

              <!-- Bs -->
              <div v-show="visible">
                <div class="flex space-between">
                  <!-- Date -->
                  <q-input
                    filled
                    v-model="data.dateBs"
                    mask=""
                    :rules="['date']"
                    class="w48"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date" mask="DD/MM/YYYY">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <q-input
                    filled
                    v-model="data.amountBs"
                    label="Monto cancelado (Bs.)*"
                    class="w48"
                  />
                </div>

                <div class="flex space-between mb-20">
                  <q-select
                    filled
                    v-model="data.emisorBankBs"
                    options="options"
                    label="Banco Emisor*"
                    class="w48"
                  />

                  <q-input
                    filled
                    v-model="data.numberIdBs"
                    label="N de C.I. o RIF del titular de la cuenta desde donde se hizo la transferencia"
                    class="w48"
                  />
                </div>
              </div>

              <!-- Zelle -->
              <div v-show="visible == false">
                <div class="flex space-between mb-20">
                  <q-input
                    filled
                    v-model="data.emailZelle"
                    label="Correo electronico del emisor del pago"
                    class="w48"
                  />
                  <q-input
                    filled
                    v-model="data.titularZelle"
                    label="Nombre del titular de la cuenta Zelle"
                    class="w48"
                  />
                </div>
                <div class="flex space-between mb-20">
                  <q-input
                    filled
                    v-model="data.amountUsd"
                    label="Monto en USD$*"
                    class="w48"
                  />
                  <q-input
                    filled
                    v-model="data.confirmationZelle"
                    label="Número de confirmacion de Zelle*"
                    class="w48"
                  />
                </div>
              </div>
            </q-card-section>
            <!-- falta el boton para subir archivos -->
            <h5>Adjuntar Print, capture y/o soporte (opcional)</h5>
            <q-file
              filled
              v-model="data.archive"
              label="Subir Archivo"
              class="w48 mb-20"
            />
          </div>
        </q-form>
        <q-card square class="shadow-24" style="width: 350px; margin: 0 auto">
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
            <q-btn
              color="grey-8"
              class="full-width mb-20"
              icon-right="send"
              label="Enviar"
              type="submit"
              @click="toggleModal"
            />
          </q-form>
        </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import useUI from "src/composables/useUI";
// import {mapState}
export default {
  setup() {
    const { modalOpen, toggleModal, confirmPay } = useUI();
    const router = useRouter();
    const store = useStore();
    const data = ref({
      email: "",
      name: "",
      // secondName: '',
      surname: "",
      // secondSurname: '',
      phone: "",
      localphone: "",
      contract: "",
      dateBs: "",
      amountBs: "",
      emisorBankBs: "",
      numberIdBs: "",
      emailZelle: "",
      emailClient: "", //Cambiarlo luego de eliminar la parte de efectuar compra para que de aqui o del zelle le llegue el email
      titularZelle: "",
      amountUsd: "",
      confirmationZelle: "",
      archive: "",
    });

    return {
      modalOpen,
      toggleModal,

      visible: ref(null),
      dialog: ref(false),
      maximizedToggle: ref(true),
      // shape: ref("line"),
      model: ref(null),
      data,
      // Acciones para el guardado
      // name,
      // age,
      // accept,

      onSubmitConfirm: async () => {
        const { ok, message } = await confirmPay(data.value);
        console.log(message);

        if (!ok) Swal.fire("Error", message, "error");
        else {
          Swal.fire("Registrado", message.message, "success");
          router.push({ name: "login" });
        }
      },
      // onSubmit() {
      //   if (accept.value !== true) {
      //     $q.notify({
      //       color: "red-5",
      //       textColor: "white",
      //       icon: "warning",
      //       message: "You need to accept the license and terms first",
      //     });
      //   } else {
      //     $q.notify({
      //       color: "green-4",
      //       textColor: "white",
      //       icon: "cloud_done",
      //       message: "Submitted",
      //     });
      //   }
      // },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },

      date: ref(null),

      // //Options
      // group: ref("op1"),

      // options: [
      //   {
      //     label: "Transferencia en Bs",
      //     value: "op1",
      //   },
      //   {
      //     label: "Transferencia en USD Zelle",
      //     value: "op2",
      //   },
      // ],
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
  margin-bottom: 20px;
}
</style>