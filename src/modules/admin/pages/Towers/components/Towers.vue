<template>
  <q-dialog v-model="modal" persistent>
    <div class="q-pa-md" style="max-width: 1220px">
      <q-stepper
        v-model="step"
        ref="stepper"
        header-class="my-special-class"
        alternative-labels
        color="primary"
        inactive-color="grey-8"
        animated
      >
        <q-step :name="1" icon="collections" :done="step > 1" title="Torres">
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Configurar torres</h3>
          </header>
          <q-form class="row q-col-gutter-md" ref="myForm">
            <div
              v-for="(item, index) in dataTower"
              :key="index"
              class="row q-col-gutter-md full-width center"
            >
              <q-input
                label="Nombre de torre *"
                class="col-sm-3 col-md-3"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="item.name"
                outlined
                dense
              />
              <q-input
                label="¿Cuántos pisos tiene la torre?"
                class="col-sm-3 col-md-3"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="item.nFloor"
                mask="##"
                outlined
                @keyup="
                  onChangeTotalApartment(item.name, item.nFloor, item.nApartmentsXFloor)
                "
                dense
              />
              <q-input
                label="¿Cuántos apartamentos hay por piso?"
                class="col-sm-3 col-md-3"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="item.nApartmentsXFloor"
                mask="##"
                outlined
                @keyup="
                  onChangeTotalApartment(item.name, item.nFloor, item.nApartmentsXFloor)
                "
                dense
              />
              <q-input
                label="Apartamentos totales de la torre"
                class="col-sm-3 col-md-3"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="item.nApartments"
                mask="###"
                outlined
                readonly
                dense
              />
            </div>
            <q-checkbox v-model="right" disable label="PH" class="col-md-5 mb-20" />
            <!-- agregar check -->
          </q-form>
        </q-step>

        <!-- 2 -->
        <q-step :name="2" icon="apartment" :done="step > 2" title="Detalles de torres">
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Configure donde vive</h3>
          </header>
          <q-form class="row q-col-gutter-md">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab
                  v-for="(item, index) in dataTower"
                  :key="index"
                  :name="item.name"
                  :label="item.name"
                />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel
                  v-for="(item2, index) in dataTower"
                  :key="item2.name"
                  :name="item2.name"
                  class="row q-col-gutter-md justify-end"
                >
                  <div
                    v-for="(item3, index2) in item2.apartments"
                    :key="index2"
                    class="mb-20"
                  >
                    <div class="row q-col-gutter-md">
                      <q-input
                        label="Número Apartamento"
                        class="col-sm-2 col-md-2"
                        :rules="[(val) => !!val || 'Campo requerido']"
                        v-model="item3.apartment"
                        readonly
                        outlined
                        dense
                      />
                      <q-input
                        label="Nombre de apartamento *"
                        class="col-sm-2 col-md-2"
                        :rules="[(val) => !!val || 'Campo requerido']"
                        v-model="item3.name"
                        outlined
                        dense
                      />
                      <q-input
                        label="Intercomunicador"
                        class="col-sm-2 col-md-2"
                        :rules="[(val) => !!val || 'Campo requerido']"
                        v-model="item3.intercom"
                        outlined
                        dense
                      />
                      <q-input
                        label="Puesto de estacionamiento *"
                        class="col-sm-2 col-md-2"
                        :rules="[(val) => !!val || 'Campo requerido']"
                        v-model="item3.parking"
                        outlined
                        dense
                      />
                      <q-input
                        label="Piso"
                        class="col-sm-1 col-md-1"
                        :rules="[(val) => !!val || 'Campo requerido']"
                        v-model="item3.floor"
                        readonly
                        outlined
                        dense
                      />
                      <q-input
                        label="Aliquota % *"
                        class="col-sm-2 col-md-2"
                        :rules="[(val) => !!val || 'Campo requerido']"
                        v-model="item3.aliquot"
                        outlined
                        @keydown="filterKey('decimal', $event)"
                        dense
                        @keyup="onChangeAliquote(item2.name)"
                      />
                    </div>
                    <q-separator
                      v-if="item3.apartment % item2.nApartmentsXFloor == 0"
                      inset
                      color="primary"
                    />
                  </div>
                  <q-input
                    label="Total"
                    class="col-sm-4 col-md-4"
                    :rules="[
                      (val) =>
                        val == 100 ||
                        val == 99.9 ||
                        'El total de la alicuota debe ser 100',
                    ]"
                    v-model="item2.totalAliquot"
                    outlined
                    dense
                    readonly
                  />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </q-form>
        </q-step>

        <q-step :name="3" icon="paid" title="Pagos mensuales">
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Configuracion de pago mensual</h3>
          </header>
          <q-form
            class="row q-col-gutter-sm p40"
            ref="myForm3"
            enctype="multipart/form-data"
          >
            <div class="row flex-column full-width">
              <q-select
                outlined
                dense
                v-model="data.publishDay"
                :options="optionsPublish"
                @update:model-value="onChangePublishDay(data.publishDay)"
                label="Día de publicación de Recibos *"
                class="col-md-5 mb-20"
              />
              <!--  -->
              <q-select
                outlined
                dense
                v-model="data.payDay"
                :options="optionsDays"
                label="Día límite para los pagos *"
                class="col-md-5 mb-20"
              />

              <q-select
                outlined
                dense
                v-model="data.monthDelinquency"
                :options="optionsDelinquency"
                label="Meses de Morosidad permitidos *"
                class="col-md-5 mb-20"
              />

              <q-checkbox
                v-model="data.indicator"
                label="Cobro Morosidad"
                class="col-md-5 mb-20"
              />

              <div v-if="data.indicator" class="col-md-5 mb-20">
                <h4>Ácta de Constitución</h4>
                <!-- <q-input
                  @update:model-value="
                    (val) => {
                      data.certificate = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Subir Acta"
                /> -->
                <q-file
                  outlined
                  dense
                  v-model="data.certificate"
                  label="Subir Acta"
                  class="col-md-5 mb-20"
                  accept=".pdf"
                  @rejected="onRejected"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <!-- <q-input
                  outlined
                  dense
                  v-model="data.penaltyPercent"
                  label="Porcentaje de penalización de morosidad*"
                  class="col-md-5 mb-20"
                  mask="##"
                /> -->
                <div class="col-md-5 mb-20">
                  <q-badge color="primary">
                    * Porcentaje de penalización de Morosidad &nbsp;
                    <b> {{ data.penaltyPercent }}</b
                    >% (0 a 40)
                  </q-badge>

                  <q-slider v-model="data.penaltyPercent" :min="0" :max="40" />
                </div>
                <!-- <q-slider
                  label="Porcentaje de penalización de morosidad*"
                  v-model="data.penaltyPercent"
                  marker-labels
                  class="col-md-5 mb-20"
                  :min="1"
                  :max="40"
                /> -->
              </div>
            </div>
          </q-form>
        </q-step>

        `<template v-slot:navigation>
          <q-stepper-navigation class="row justify-end">
            <!-- BOTONES SEGUN STEP  -->
            <!-- 1 -->
            <q-btn
              @click="onSubmitFirst(this)"
              v-if="step == 1"
              color="primary"
              label="Continuar"
              type="submit"
            />

            <q-btn
              v-if="step > 1"
              outline
              color="primary"
              @click="$refs.stepper.previous()"
              label="Anterior"
              class="q-mr-sm"
              type="submit"
            />
            <!-- 2 -->

            <q-btn
              @click="onSubmitSecond(this)"
              v-if="step == 2"
              color="primary"
              label="Continuar"
              type="submit"
            />
            <!-- 3 -->
            <q-btn
              @click="handleSubmitThird"
              v-if="step == 3"
              color="primary"
              label="Finalizar"
              type="submit"
            />
          </q-stepper-navigation> </template
        >`
      </q-stepper>
    </div>
  </q-dialog>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";
import useUI from "src/composables/useUI";
import Swal from "sweetalert2";

export default {
  setup() {
    const { filterKey } = useUI();
    const {
      saveTower,
      updateTower,
      saveApartment,
      updateApartment,
      saveConfigPay,
      getApartmentByIdResidential,
      getDataTower,
    } = useAdmin();
    const $q = useQuasar();
    const store = useStore();
    const data = reactive({
      certificate: "",
      idResidential: "",
      payDay: "",
      publishDay: "",
      monthDelinquency: "",
      penaltyPercent: "",
      indicator: false,
    });
    const dataTower = reactive([]);
    const sumAliquot = reactive([]);
    const optionsDays = reactive([]);
    const totalAliquot = ref(0);
    const dataDetailTower = reactive([]);

    const step1Save = ref(true);
    const step2Save = ref(true);
    const modal = ref(true);

    const tab = ref();

    //steper
    const step = ref(1);
    const myForm = ref(null);
    const right = ref(false);

    //fin steper
    const currentItem = reactive({});
    const toggleModal = () => {
      modal.value = !modal.value;
    };
    const handleSubmitThird = async () => {
      try {
        Swal.fire({
          title: "Confirmación",
          text:
            "¿Está conforme con los datos ingresados?, ya que una vez guardados no podrán ser modificados",
          icon: "question",
          customClass: {
            container: "z-index-7000",
          },
          showCancelButton: true,
          confirmButtonColor: "#388e3c",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "",
              text: "¿Desea que sus datos sean guardados en el sistema?",
              icon: "question",
              customClass: {
                container: "z-index-7000",
              },
              showCancelButton: true,
              confirmButtonColor: "#388e3c",
              cancelButtonColor: "#d33",
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
            }).then(async (result) => {
              if (result.isConfirmed) {
                data.idResidential = store.state["auth"].idResidential;

                const { ok, message } = await saveConfigPay(data);
                if (!ok)
                  $q.notify({
                    message: message.message != null ? message.message : message,
                    color: "negative",
                    icon: "error",
                  });
                else {
                  //HACER PREGUNTA SI ESTA CONFORME CON LOS DATOS INGRESADOS DEBIDO A QUE NO SE PODRAN MODIFICAR
                  store.commit("admin/setTowerVisible", true);
                  $q.notify({
                    message: message.message,
                    color: "positive",
                    icon: "check_circle",
                  });
                }
              }
            });
          }
        });
      } catch (error) {
        if (error.message != "Network Error") {
          return { ok: false, message: error.message };
        } else {
          return { ok: false, message: "La API no esta activa" };
        }
      }
    };

    onMounted(async () => {
      const store = useStore();
      console.log(store.state["auth"].idResidential, "residential");
      const idUser = store.state["auth"].id;

      const { ok, message } = await getDataTower(idUser);
      const numberTower = message.data.nTowers;
      if (message.data.tower.length) {
        step1Save.value = !step1Save.value;

        for (let index = 0; index < numberTower; index++) {
          dataTower.push({
            id: message.data.tower[index].id,
            idResidential: message.data.tower[index].idResidential,
            name: message.data.tower[index].name,
            apartments: [],
            totalAliquot: 0,
            nApartments: message.data.tower[index].nApartments,
            nFloor: message.data.tower[index].nFloor,
            nApartmentsXFloor: message.data.tower[index].nApartmentsXFloor,
          });
        }

        if (message.data.apartment.length) {
          step2Save.value = !step2Save.value;
          dataTower.forEach((element) => {
            var floor = 0;
            var index = -1;
            var sumAli = 0;
            message.data.apartment.forEach((element2) => {
              if (element.id == element2.idTower) {
                index++;
                if (index % element.nApartmentsXFloor == 0) {
                  floor++;
                }

                element.apartments.push({
                  id: element2.id,
                  apartment: element2.apartment,
                  name: element2.name,
                  floor: element2.floor,
                  intercom: element2.intercom,
                  parking: element2.parking,
                  aliquot: element2.aliquot,
                });
                console.log(element.apartments, "entre ififif");

                element.totalAliquot = parseFloat(
                  parseFloat(element.totalAliquot) + parseFloat(element2.aliquot)
                ).toFixed(2);

                // element.totalAliquot.forEach((element3) => {
                //   if (element.name == element3.torre) {
                //     element3.totalAliquot = element3.totalAliquot + element2.aliquot;

                //     if (element3.totalAliquot.startsWith("0")) {
                //       element3.totalAliquot = element3.totalAliquot.slice(1);
                //     }
                //   }
                // });
              }
            });
          });
        } else {
          dataTower.forEach((element) => {
            var floor = 0;
            for (let index = 0; index < element.nApartments; index++) {
              if (index % element.nApartmentsXFloor == 0) {
                floor++;
              }
              element.apartments.push({
                id: "",
                apartment: index + 1,
                name: "",
                floor: floor,
                intercom: "",
                parking: "",
                aliquot: "",
              });
            }
          });
        }
      } else {
        for (let index = 0; index < numberTower; index++) {
          dataTower.push({
            id: "",
            idResidential: store.state["auth"].idResidential,
            apartments: [],
            totalAliquot: 0,
            name: "",
            nApartments: "",
            nFloor: "",
            nApartmentsXFloor: "",
          });
        }
      }
    });

    return {
      loading: ref(false),
      model: ref(null),
      tab,
      modal,
      //stpr
      step,
      myForm,
      //stpr
      currentItem,
      toggleModal,
      handleSubmitThird,
      right,
      data,
      dataTower,
      sumAliquot,
      dataDetailTower,
      step1Save,
      step2Save,
      filterKey,
      optionsDays,
      optionsPublish: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      optionsDelinquency: [3, 4, 5, 6, 7],

      //metodo para validar el total de la alicuota
      onChangeAliquote: (tower) => {
        var sum = 0;
        var towerArr = dataTower.find((towerEl) => towerEl.name === tower);
        console.log(towerArr.totalAliquot);
        towerArr.apartments.forEach((element) => {
          if (element.aliquot != "") {
            sum = sum + parseFloat(element.aliquot);
          }
        });

        if (sum == 99.9) {
          sum = 100;
        }
        towerArr.totalAliquot = sum;

        dataTower.map((item) => (item.name === tower ? towerArr : item));
      },

      //metodo para validar el dia permitido
      onChangePublishDay: (dayPublish) => {
        optionsDays.splice(0, optionsDays.length);
        for (let index = dayPublish; index < 28; index++) {
          optionsDays.push(index + 1);
        }
      },

      onRejected(rejectedEntries) {
        // Notify plugin needs to be installed
        // https://quasar.dev/quasar-plugins/notify#Installation
        $q.notify({
          type: "warning",
          message: `${rejectedEntries.length} Archivo Invalido`,
        });
      },

      onChangeTotalApartment: (tower, nFloor, nApartmentsXFloor) => {
        var towerArr = dataTower.find((towerEl) => towerEl.name === tower);

        if (nFloor != "" && nApartmentsXFloor != "")
          towerArr.nApartments = parseInt(nFloor) * parseInt(nApartmentsXFloor);
      },

      onSubmitFirst: async (a) => {
        try {
          if (step1Save.value) {
            const { ok, message } = await saveTower(dataTower);
            console.log(message);
            if (!ok)
              $q.notify({
                message: message.message != null ? message.message : message,
                color: "negative",
                icon: "error",
              });
            else {
              dataTower.forEach((element) => {
                console.log("entre");

                message.data.tower.forEach((element2) => {
                  if (element.name == element2.name) element.id = element2.id;
                });

                var floor = 0;
                element.apartments = [];
                for (let index = 0; index < element.nApartments; index++) {
                  if (index % element.nApartmentsXFloor == 0) {
                    floor++;
                    element.totalAliquot = 0;
                  }
                  element.apartments.push({
                    id: "",
                    apartment: index + 1,
                    name: "",
                    floor: floor,
                    intercom: "",
                    parking: "",
                    aliquot: "",
                  });
                }
              });
              console.log(dataTower, "datadatatowertower");

              tab.value = dataTower.find((element) => element.name != "").name;
              step1Save.value = !step1Save.value;
              a.$refs.stepper.next();
            }
          } else {
            const { ok, message } = await updateTower(dataTower);
            if (!ok)
              $q.notify({
                message: message.message != null ? message.message : message,
                color: "negative",
                icon: "error",
              });
            else {
              tab.value = dataTower.find((element) => element.name != "").name;

              dataTower.forEach((element) => {
                console.log("entre");

                message.data.tower.forEach((element2) => {
                  if (element.name == element2.name) element.id = element2.id;
                });

                var floor = 0;
                if (element.apartmets) {
                  element.apartments = [];
                  for (let index = 0; index < element.nApartments; index++) {
                    if (index % element.nApartmentsXFloor == 0) {
                      floor++;
                      element.totalAliquot = 0;
                    }
                    element.apartments.push({
                      id: "",
                      apartment: index + 1,
                      name: "",
                      floor: floor,
                      intercom: "",
                      parking: "",
                      aliquot: "",
                    });
                  }
                }
              });
              a.$refs.stepper.next();
            }
          }
        } catch (error) {
          if (error.message != "Network Error") {
            return { ok: false, message: error.message };
          } else {
            return { ok: false, message: "La API no esta activa" };
          }
        }
      },

      onSubmitSecond: async (a) => {
        try {
          if (step2Save.value) {
            let sum = 0;
            let bool = false;
            dataTower.forEach((element) => {
              sum = 0;
              element.apartments.forEach((element2) => {
                sum = sum + parseFloat(element2.aliquot);

                if (
                  element2.aliquot == "" ||
                  element2.intercom == "" ||
                  element2.name == "" ||
                  element2.parking == ""
                ) {
                  $q.notify({
                    message: "Faltan campos por llenar",
                    color: "red",
                  });
                  bool = true;
                  return;
                }
              });

              if (sum > 100 || sum < 99.99) {
                $q.notify({
                  message: "La alicuota del piso tiene que dar un total de 100",
                  color: "primary",
                });
                bool = true;
                sum = 0;
                return;
              }
            });

            //Se valida que no haya una excepcion en las validaciones
            if (bool) return;
            const { ok, message } = await saveApartment(dataTower);
            console.log(message);
            if (!ok)
              $q.notify({
                message: message.message != null ? message.message : message,
                color: "negative",
                icon: "error",
              });
            else {
              dataTower.forEach((element) => {
                message.data.forEach((element2) => {
                  element2.forEach((element3) => {
                    if (element.idTower == element3.idTower) {
                      element.apartments.forEach((element4) => {
                        if (element3.name == element4.name) {
                          element4.id = element3.id;
                        }
                      });
                    }
                  });
                });
              });

              step2Save.value = !step2Save.value;
              a.$refs.stepper.next();
            }
          } else {
            const { ok, message } = await updateApartment(dataTower);
            console.log(message);
            if (!ok)
              $q.notify({
                message: message.message != null ? message.message : message,
                color: "negative",
                icon: "error",
              });
            else {
              a.$refs.stepper.next();
            }
          }
        } catch (error) {
          if (error.message != "Network Error") {
            return { ok: false, message: error.message };
          } else {
            return { ok: false, message: "La API no esta activa" };
          }
        }
      },
      onMounted,
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
</style>
