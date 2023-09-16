<template>
  <q-page class="window-height window-width row justify-center items-center custom-bg">
    <div class="q-pa-md" style="width: 80%; max-width: 800px">
      <q-stepper
        v-model="step"
        ref="stepper"
        header-class="my-special-class"
        alternative-labels
        color="primary"
        inactive-color="grey-8"
        animated
      >
        <q-step
          :name="1"
          icon="collections"
          :done="step > 1"
          title="Tipo de administrador"
        >
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Tipo de administrador</h3>
            <p>
              Finalmente vamos a especificar el tipo de adminitrador el cual se encargará
              de la gestión.<br />
              <span class="text-italic">Por favor seleccione alguna de las opciones</span>
            </p>
          </header>
          <q-form class="row justify-center step-3-registry">
            <q-btn-toggle
              v-model="data.typeAdmin"
              push
              toggle-color="light-green-4"
              :options="[
                { value: 62, slot: 'one' },
                { value: 61, slot: 'two' },
              ]"
            >
              <template v-slot:one>
                <q-icon size="lg" class="q-mb-lg" name="perm_identity" />
                <header class="text-center">
                  <span class="font-weight-bold">Administrador externo</span>
                  <br />
                  <span class="text-grey">No vivo dentro del conjunto residencial</span>
                </header>
              </template>

              <template v-slot:two>
                <q-icon size="lg" class="q-mb-lg" name="perm_identity" />
                <header class="text-center">
                  <span class="font-weight-bold">Administrador Interno</span>
                  <br />
                  <span class="text-grey">Vivo dentro del conjunto residencial</span>
                </header>
              </template>
            </q-btn-toggle>
          </q-form>
        </q-step>

        <q-step :name="2" icon="home" :done="step > 2" title="Residencia">
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Conjunto Residencial</h3>
            <p>
              Bien, ahora vamos con las configuraciones del conjunto residencial.<br />
              <span class="text-italic">Por favor llena todos los campos</span>
            </p>
          </header>
          <q-form class="row q-col-gutter-md">
            <q-input
              label="Nombre del conjunto residencial *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.residentialName"
              class="col-sm-6 col-md-6"
              outlined
              dense
            />
            <q-input
              label="¿Cuántas torres tiene el conjunto? *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.nTowers"
              class="col-sm-6 col-md-6"
              type="number"
              min="1"
              @keydown="filterKey('entero', $event), firstCero(data.nTowers, $event)"
              outlined
              dense
            />
            <q-select
              outlined
              dense
              label="Tipo de documento *"
              v-model="data.idTypeRifResidential"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="code"
              option-value="id"
              :options="typeRif.filter((element) => element.code === 'J')"
              class="col-sm-2 col-md-2"
            ></q-select>
            <q-input
              label="Rif *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.rifResidential"
              maxlength="9"
              @keydown="filterKey('entero', $event)"
              class="col-sm-4 col-md-4"
              type="text"
              outlined
              dense
            />
            <q-input
              label="Dirección del Condominio *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.addressResidential"
              class="col-sm-6 col-md-6"
              type="text"
              outlined
              dense
            />
            <q-file
              outlined
              dense
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.logo"
              label="Subir Logo (Opcional)"
              class="col-sm-6 col-md-6"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-select
              outlined
              dense
              label="Cod. Area *"
              v-model="data.idAreaCodeLocalPhoneResidential"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="description"
              option-value="id"
              :options="optionAreaCodeLocal"
              class="col-sm-2 col-md-2"
            ></q-select>
            <q-input
              label="Teléfono *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.localphoneResidential"
              class="col-sm-4 col-md-4"
              type="text"
              mask="### - ####"
              outlined
              dense
            />

            <q-select
              outlined
              dense
              label="Cod. Area *"
              v-model="data.idAreaCodePhoneResidential"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="description"
              option-value="id"
              :options="optionAreaCodeCell"
              class="col-sm-2 col-md-2"
            ></q-select>
            <q-input
              label="Teléfono Secundario"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.phoneResidential"
              class="col-sm-4 col-md-4"
              mask="### - ####"
              type="text"
              outlined
              dense
            />
            <q-input
              label="Email Residencial *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.email"
              class="col-sm-6 col-md-6"
              type="text"
              outlined
              dense
            />
            <!-- <q-input
              label="¿Cuántos apartamentos tiene cada torre? *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.nApartmentsXTower"
              class="col-sm-6 col-md-6"
              type="number"
              outlined
              dense
            /> -->
            <!-- <q-input
              label="¿Cuántos pisos tiene cada torre? *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.nFloorXTower"
              class="col-sm-6 col-md-6"
              type="number"
              outlined
              dense
            /> -->
          </q-form>
        </q-step>
        <q-step :name="3" icon="account_balance" :done="step > 3" title="Datos Bancarios">
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Datos Bancarios</h3>
            <p>Por favor, ingrese los datos bancarios de la residencia.<br /></p>
          </header>
          <q-form class="row q-col-gutter-md">
            <q-select
              outlined
              dense
              v-model="data.idBank"
              label="Nombre del banco"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="description"
              option-value="id"
              :options="banks"
              class="col-sm-6 col-md-6"
            ></q-select>
            <q-input
              label="Número de cuenta *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.bankAccount"
              class="col-sm-6 col-md-6"
              type="text"
              maxlength="20"
              @keydown="filterKey('entero', $event)"
              outlined
              dense
            />
            <q-select
              outlined
              dense
              label="Tipo de documento *"
              v-model="idTypeRifBank"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="code"
              option-value="id"
              :options="typeRif"
              class="col-sm-2 col-md-2"
            ></q-select>
            <q-input
              label="Rif *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="rifBank"
              maxlength="9"
              @keydown="filterKey('entero', $event)"
              class="col-sm-4 col-md-4"
              type="text"
              outlined
              dense
            />

            <q-select
              outlined
              dense
              v-model="data.idTypeAccount"
              label="Tipo de cuenta *"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="description"
              option-value="id"
              :options="typeBankAccount"
              class="col-sm-6 col-md-6"
            ></q-select>
            <!-- <div class="col-sm-6 col-md-6 row q-col-gutter-md" v-for="tt in titular">
              <q-input
                label="Cédula *"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="tt.ciHolder"
                maxlength="9"
                @keydown="filterKey('entero', $event)"
                class="col-sm-6 col-md-6"
                type="text"
                outlined
                dense
              />
              <q-input
                label="Nombre del Titular *"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="tt.name"
                class="col-sm-6 col-md-6"
                type="text"
                outlined
                dense
              />
            </div>-->
            <!-- <div class="col-sm-6 col-md-6">
              <q-btn push color="positive" @click="eventAddTitular()" round icon="add" />
              <q-btn
                push
                v-if="titular.length > 1"
                color="grey-5"
                @click="eventRemoveTitular()"
                round
                icon="remove"
              />
            </div> -->
            <!-- <q-input
              label="¿Cuántos apartamentos tiene cada torre? *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.nApartmentsXTower"
              class="col-sm-6 col-md-6"
              type="number"
              outlined
              dense
            /> -->
            <!-- <q-input
              label="¿Cuántos pisos tiene cada torre? *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.nFloorXTower"
              class="col-sm-6 col-md-6"
              type="number"
              outlined
              dense
            /> -->
          </q-form>
        </q-step>

        <q-step :name="4" icon="perm_identity" title="Datos personales">
          <header class="text-center">
            <h3 class="q-my-sm text-weight-light">Regístrate</h3>
            <p>
              Séras el administrador de un nuevo condiminio, por tanto debemos registrar
              tus datos. <br />
              <span class="text-italic">Por favor llena todos los campos</span>
            </p>
          </header>
          <q-form
            class="row q-col-gutter-sm"
            @submit.prevent="handleSubmit"
            @reset="onReset"
            ref="myForm"
          >
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
              v-model="data.idTypeDocumentAdmin"
              :rules="[(val) => !!val || 'Campo requerido']"
              option-label="code"
              option-value="id"
              :options="typeCI"
              class="col-sm-2 col-md-2"
            ></q-select>
            <q-input
              label="Cédula *"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.ciAdmin"
              @keydown="filterKey('entero', $event)"
              maxlength="8"
              class="col-sm-4 col-md-4"
              type="text"
              outlined
              dense
            />
            <!-- <q-input
              class="col-sm-6 col-md-6"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.birthdate"
              type="date"
              outlined
              dense
            /> -->
            <!-- <q-input
              label="Correo electrónico *"
              class="col-sm-6 col-md-6"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.email"
              outlined
              dense
            /> -->
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
              label="Dirección *"
              class="col-sm-6 col-md-6"
              :rules="[(val) => !!val || 'Campo requerido']"
              v-model="data.address"
              outlined
              dense
            />

            <div
              v-if="data.typeAdmin === 'one'"
              class="row q-col-gutter-sm"
              style="width: 100%"
            >
              <q-input
                label="Rif de la empresa/firma personal*"
                class="col-sm-6 col-md-6"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="data.rifExtern"
                @keydown="filterKey('entero', $event)"
                maxlength="9"
                outlined
                dense
              />
              <q-input
                label="Dirección de la empresa/firma personal*"
                class="col-sm-6 col-md-6"
                :rules="[(val) => !!val || 'Campo requerido']"
                v-model="data.addressExtern"
                outlined
                dense
              />
            </div>
          </q-form>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="row justify-end">
            <q-btn
              v-if="step > 1"
              outline
              color="grey-8"
              @click="$refs.stepper.previous()"
              label="Anterior"
              class="q-mr-sm"
              type="submit"
            />
            <q-btn
              @click="$refs.stepper.next()"
              v-if="step < 4"
              color="primary"
              label="Continuar"
              type="submit"
            />
            <q-btn
              @click="handleSubmit"
              v-else
              color="grey-6"
              label="Finalizar"
              type="submit"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
      <q-card-section class="text-center q-pa-sm">
        <router-link class="text-grey-6" :to="{ name: 'home' }">
          <p>Cancelar Registro</p>
        </router-link>
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
import { useQuasar } from "quasar";
import useUI from "src/composables/useUI";
export default {
  name: "Signup",
  setup() {
    const { filterKey, firstCero } = useUI();
    const $q = useQuasar();
    const { createUser } = useAuth();
    const step = ref(1);
    const model = ref(null);
    const store = useStore();
    const router = useRouter();
    const myForm = ref(null);
    const titular = reactive([{ name: "", ciHolder: "" }]);
    const typeDocument = ref([]);
    const typeRif = ref([]);
    const typeCI = ref([]);
    const typeBankAccount = ref([]);
    const banks = ref([]);
    const optionAreaCodeLocal = reactive([]);
    const optionAreaCodeCell = reactive([]);
    const data = reactive({
      idUser: "",
      name: "",
      secondName: "",
      surname: "",
      secondSurname: "",
      idTypeDocumentAdmin: [],
      ciAdmin: "",
      address: "",
      idAreaCodePhone: [],
      phone: "",
      idAreaCodeLocalPhone: [],
      localphone: "",
      phones: [],

      idTypeRifResidential: [],
      rifResidential: "",
      logo: [],
      addressResidential: "",
      idAreaCodePhoneResidential: [],
      phoneResidential: "",
      idAreaCodeLocalPhoneResidential: [],
      localphoneResidential: "",
      phonesResidential: [],
      email: "",

      nTowers: "",
      residentialName: "",
      typeAdmin: "",

      addressExtern: "",
      rifExtern: "",

      idBank: [],
      idTypeAccount: [],
      bankAccount: "",
      idTypeRifBank: [],
      rifBank: "",
      holder: "",
      ciHolder: "",
    });

    const rifBank = computed(() => data.rifResidential);
    const idTypeRifBank = computed(() => data.idTypeRifResidential);
    onMounted(async () => {
      const { getTypeDocument, getBanks, getPerfilData } = useAuth();
      const { getPhoneAreaCod, getRifType, getCIType, getBankTypeAccount } = useUI();

      var { ok, message } = await getTypeDocument();
      typeDocument.value = message.data;

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
      const dataTypeRif = await getRifType();
      typeRif.value = dataTypeRif.message.data;
      const dataTypeCI = await getCIType();
      typeCI.value = dataTypeCI.message.data;
      const dataBankTypeAccount = await getBankTypeAccount();
      typeBankAccount.value = dataBankTypeAccount.message.data;

      message = await getBanks();
      banks.value = message.message.data;

      const idUser = store.state["auth"].id;
      message = await getPerfilData(idUser);
      data.name = message.message.data.name;
      data.secondName = message.message.data.secondName;
      data.surname = message.message.data.surname;
      data.secondSurname = message.message.data.secondSurname;
      data.address = message.message.data.address;

      const phone = message.message.data.phones;

      data.idAreaCodeLocalPhone = optionAreaCodeLocal.find(
        (element) =>
          element.id == phone.find((element) => element.idTypePhone == 73).idAreaCode
      );
      data.localphone = phone.find((element) => element.idTypePhone == 73).number;
      data.idAreaCodePhone = optionAreaCodeCell.find(
        (element) =>
          element.id == phone.find((element) => element.idTypePhone == 74).idAreaCode
      );
      data.phone = phone.find((element) => element.idTypePhone == 74).number;

      data.idTypeDocumentAdmin = typeCI.value.find(
        (element) => element.id == message.message.data.idTypeDocument
      );

      data.ciAdmin = message.message.data.ci;
    });

    const handleSubmit = async () => {
      //   Si no coinciden los passwords, no hagas nada
      data.idUser = store.state["auth"].id;
      let flag = 0;
      titular.forEach((element) => {
        if (flag == 0) {
          data.holder = element.name;
          data.ciHolder = element.ciHolder;
        } else {
          data.holder = `${data.holder} ${element.name}`;
          data.ciHolder = `${data.ciHolder} ${element.ciHolder}`;
        }
        flag++;
      });
      //Para los telefonos el typePhone es 73 para locales y 74 para celulares, entitySubClass
      //Telefonos del admin
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

      //Telefonos de la residencia
      data.phonesResidential.push({
        idTypePhone: 73,
        idAreaCode: data.idAreaCodeLocalPhoneResidential.id,
        number: data.localphoneResidential,
      });

      data.phonesResidential.push({
        idTypePhone: 74,
        idAreaCode: data.idAreaCodePhoneResidential.id,
        number: data.phoneResidential,
      });

      data.rifBank = rifBank;
      data.idTypeRifBank = idTypeRifBank.value.id;
      // data.idRole = 2;
      $q.loading.show();
      const { ok, message } = await createUser(data);
      $q.loading.hide();
      console.log(ok, message);
      data.phones = [];
      data.phonesResidential = [];

      if (ok) {
        $q.notify({
          message: message.message,
          color: "positive",
          icon: "check_circle",
        });
        router.push({ name: "tower" });
      } else {
        $q.notify({
          message: message.message != null ? message.message : message,
          color: "negative",
          icon: "error",
        });
      }
    };

    const onReset = () => {
      Object.keys(data).forEach((key) => {
        data[key] = "";
      });
    };

    return {
      data,
      myForm,
      rifBank,
      idTypeRifBank,
      banks,
      typeDocument,
      typeRif,
      typeCI,
      typeBankAccount,
      optionAreaCodeCell,
      optionAreaCodeLocal,
      handleSubmit,
      onReset,
      step,
      model,
      filterKey,
      firstCero,
      titular,
      eventAddTitular: () => {
        titular.push({ name: "" });
      },
      eventRemoveTitular: () => {
        titular.splice(-1, 1);
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
  background: #333d50 !important;
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
</style>
