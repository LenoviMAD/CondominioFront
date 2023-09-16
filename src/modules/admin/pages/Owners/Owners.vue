<template>
  <section class="section row flex-column full-width">
    <header class="text-center col-md-12 mb-20">
      <h3 class="q-my-sm text-weight-light">Usuarios</h3>
    </header>
    <div class="row flex-column full-width mb-20">
      <q-select
        outlined
        dense
        label="Torre"
        class="col-md-5 mb-20"
        v-model="dataSelected"
        option-label="name"
        option-value="id"
        :options="dataTower"
      />
    </div>
    <div
      class="row full-width q-col-gutter-md"
      v-for="(item, index) in dataTower"
      :key="index"
    >
      <div
        class="row full-width q-col-gutter-md"
        v-for="(item2, index2) in item.apartments"
        :key="index2"
        v-if="item.name == dataSelected.name"
      >
        <div class="q-my-xl col-md-3">
          <q-input
            label="N° de Apartamento *"
            class="col-sm-2 col-md-2"
            readonly
            v-model="item2.name"
            :rules="[(val) => !!val || 'Campo requerido']"
            outlined
            dense
          />
        </div>
        <div class="col-md-9 mb-20">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="bg-grey-3 text-grey-7"
              indicator-color="primary"
              align="justify"
            >
              <q-tab name="credentials" label="Credenciales" />
              <q-tab name="approval" label="Aprobación" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="credentials">
                <div class="row full-width q-col-gutter-md">
                  <q-input
                    label="Correo Electronico *"
                    class="col-sm-4 col-md-4"
                    v-model="item2.email"
                    outlined
                    dense
                  />
                  <q-checkbox
                    label="Credenciales"
                    disable
                    v-model="item2.credentials"
                    class="col-md-4 q-my-sm"
                  />
                  <q-checkbox
                    label="Cambio de contraseña"
                    disable
                    v-model="item2.changePassword"
                    class="col-md-4 q-my-sm"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="approval">
                <div class="row full-width q-col-gutter-md">
                  <q-input
                    label="Nombre(s) Propietario(s)"
                    disable
                    class="col-sm-4 col-md-4"
                    v-model="item2.nameUser"
                    :rules="[(val) => !!val || 'Campo requerido']"
                    outlined
                    dense
                  />
                  <q-input
                    label="Cédula"
                    disable
                    class="col-sm-3 col-md-3"
                    v-model="item2.ciUser"
                    :rules="[(val) => !!val || 'Campo requerido']"
                    outlined
                    dense
                  />
                  <div>
                    <q-btn
                      :disable="item2.documentURL == null ? true : false"
                      @click="clickOpenDocument(item2.documentURL)"
                      flat
                      round
                      color="primary"
                      icon="file_download"
                    >
                      <q-tooltip v-if="item2.documentURL != null" class="bg-accent">
                        Documento de propiedad</q-tooltip
                      >
                      <q-tooltip v-else class="bg-accent">
                        No tiene documento de propiedad</q-tooltip
                      >
                    </q-btn>
                  </div>
                  <q-select
                    outlined
                    dense
                    v-model="item2.aprove"
                    label="Aprobación"
                    class="col-sm-4 col-md-4"
                    option-label="name"
                    option-value="id"
                    :options="option"
                  />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row justify-end" v-if="dataSelected.apartments != null">
      <!-- BOTONES SEGUN STEP  -->
      <!-- 1 -->
      <q-btn color="primary" label="Enviar" @click="onSubmit()" />
    </div>
  </section>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";
import useUI from "src/composables/useUI";

export default {
  setup() {
    const { filterKey } = useUI();
    const { getTowerCredential, registerUserTower } = useAdmin();
    const $q = useQuasar();
    const store = useStore();
    const dataSelected = ref([]);
    const dataTower = reactive([]);

    onMounted(async () => {
      const idUser = store.state["auth"].id;
      const { ok, message } = await getTowerCredential(idUser);
      console.log(message.data);
      const numberTower = message.data.nTowers;
      if (message.data.tower) {
        for (let index = 0; index < numberTower; index++) {
          dataTower.push({
            idTower: message.data.tower[index].id,
            idResidential: store.state["auth"].idResidential,
            name: message.data.tower[index].name,
            apartments: [],
            nApartments: message.data.tower[index].nApartments,
          });
        }

        if (message.data.apartment.length) {
          console.log("dentro if", message.data.apartment);
          // console.log(step2Save);
          dataTower.forEach((element) => {
            message.data.apartment.forEach((element2) => {
              if (element.idTower == element2.idTower) {
                element.apartments.push({
                  id: element2.id,
                  idUser: element2.idUser,
                  idTower: element2.idTower,
                  apartment: element2.apartment,
                  name: element2.name,
                  floor: element2.floor,
                  email: element2.email,
                  credentials: element2.credentials,
                  changePassword: element2.changePassword,
                  documentURL: element2.documentURL,
                  nameUser: "",
                  ciUser: "",
                  aprove: "",
                });
              }
            });
          });
        }
      } else {
        $q.notify({
          message: "Por favor dirijase a la sección de torres y complete los pasos.",
          color: "primary",
          icon: "announcement",
        });
      }
      console.log(dataTower, "msj");
    });

    return {
      tab: ref("credentials"),
      onMounted,
      dataTower,
      dataSelected,
      option: ["Aprobado", "Reprobado"],

      changed: () => {
        console.log(dataSelected);
      },

      onSubmit: async () => {
        try {
          $q.loading.show();

          const { ok, message } = await registerUserTower(dataTower);
          console.log(message.data);
          $q.loading.hide();
          if (ok) {
            $q.notify({
              message: message.message,
              color: "positive",
              icon: "check_circle",
            });
            dataTower.forEach((element) => {
              element.apartments.forEach((element2) => {
                message.data.forEach((element3) => {
                  if (element.idTower == element3.idTower) {
                    element3.apartments.forEach((element4) => {
                      if (element2.id == element4.id) {
                        element2.credentials = element4.credentials;
                        element2.changePassword = element4.changePassword;
                      }
                    });
                  }
                });
              });
            });
            router.push({ name: "receipt" });
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
      clickOpenDocument: (url) => {
        window.open(url, "_blank", "location=yes,status=yes");
      },
    };
  },
};
</script>

<style></style>
