<template>
  <section class="section row flex-column full-width">
    <header class="text-center col-md-12">
      <h3 class="q-my-sm text-weight-light">Residencia {{ nameResident }}</h3>
    </header>
    <div class="row flex-column full-width">
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

    <div class="row full-width q-col-gutter-md">
      <div v-for="(item, index2) in dataTower" :key="index2" class="">
        <div
          class="row full-width q-col-gutter-md"
          style="justify-content: space-between"
          v-for="(item2, index2) in item.apartments"
          :key="index2"
          v-if="item.name == dataSelected.name"
        >
          <q-input
            label="Nro. Apartamento"
            class="col-sm-2 col-md-2"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="item2.name"
            readonly
            outlined
            dense
          />
          <q-input
            label="Intercomunicador"
            class="col-sm-2 col-md-2"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="item2.intercom"
            readonly
            outlined
            dense
          />
          <q-input
            label="Puesto de estacionamiento *"
            class="col-sm-2 col-md-2"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="item2.parking"
            readonly
            outlined
            dense
          />
          <q-input
            label="Piso"
            class="col-sm-1 col-md-1"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="item2.floor"
            readonly
            outlined
            dense
          />
          <q-input
            label="Aliquota % *"
            class="col-sm-2 col-md-2"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="item2.aliquot"
            readonly
            outlined
            dense
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";
import useUI from "src/composables/useUI";
// Iternals components

export default {
  el: "#app",
  setup() {
    const { getDataTower } = useAdmin();
    const $q = useQuasar();
    const store = useStore();
    const dataSelected = ref([]);
    const dataTower = reactive([]);
    const nameResident = ref("");

    onMounted(async () => {
      const idUser = store.state["auth"].id;

      const { ok, message } = await getDataTower(idUser);

      console.log(message.data);
      const numberTower = message.data.nTowers;
      nameResident.value = message.data.name;
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
                  name: element2.name,
                  idTower: element2.idTower,
                  floor: element2.floor,
                  intercom: element2.intercom,
                  parking: element2.parking,
                  apartment: element2.apartment,
                  aliquot: element2.aliquot,
                  email: element2.email,
                  credential: false,
                  changePassword: false,
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
      onMounted,
      dataTower,
      dataSelected,
      nameResident,
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
