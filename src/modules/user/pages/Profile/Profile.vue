<template>
  <q-page>
    <q-btn
      flat
      icon="arrow_back_ios"
      text-color="black"
      :to="{ name: 'dashboardUser' }"
      title="Atrás"
    />
    <section class="section">
      <q-form class="row q-col-gutter-md" @submit.prevent="onSubmitPerson">
        <div class="row col-sm-6 col-md-6 q-col-gutter-md">
          <h5 class="col-sm-12 col-md-12">Perfil del Usuario</h5>

          <q-input
            label="Primer Nombre *"
            class="col-sm-6 col-md-6"
            :readonly="readonly"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.name"
            outlined
            dense
          />
          <q-input
            label="Segundo Nombre"
            class="col-sm-6 col-md-6"
            :readonly="readonly"
            v-model="data.secondName"
            outlined
            dense
          />
          <q-input
            label="Primer Apellido *"
            class="col-sm-6 col-md-6"
            :readonly="readonly"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.surname"
            outlined
            dense
          />
          <q-input
            label="Segundo Apellido"
            class="col-sm-6 col-md-6"
            :readonly="readonly"
            v-model="data.secondSurname"
            outlined
            dense
          />
          <q-select
            outlined
            dense
            label="Tipo de documento *"
            v-model="data.idTypeCi"
            :rules="[(val) => !!val || 'Campo requerido']"
            option-label="code"
            option-value="id"
            :options="typeCI"
            class="col-sm-2 col-md-2"
          ></q-select>
          <q-input
            label="Cédula *"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.ci"
            @keydown="filterKey('entero', $event)"
            maxlength="8"
            class="col-sm-4 col-md-4"
            type="text"
            outlined
            dense
          />
          <q-input
            label="Fecha de Nacimiento"
            stack-label
            class="col-sm-6 col-md-6"
            :readonly="readonly"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.birthday"
            type="date"
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
          <q-file
            v-if="labelBtn == 'Guardar'"
            outlined
            dense
            :readonly="readonly"
            v-model="data.documentProperty"
            label="Subir Documento de Propiedad"
            class="col-md-5 mb-20"
            accept=".pdf, .docx"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <div v-else class="col-md-5 row">
            <q-btn
              outline
              dense
              class="col-md-12 mb-20"
              color="primary"
              label="Ver Documento"
              @click="clickOpenDocument()"
            />
          </div>
          <div class="full-width" style="display: flex; justify-content: end">
            <q-btn
              :label="labelBtn"
              @click="eventClick()"
              color="primary"
              class="q-mr-sm"
            />
          </div>
        </div>
        <div class="row col-md-6 center">
          <div class="col-12">
            <div class="">
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-subtitle1 text-center">Caption</div>
              </q-img>
            </div>
          </div>
        </div>
      </q-form>
    </section>
    <section>
      <h1 class="text-h4 box-shadow section">Recibos por pagar</h1>
      <profile-list
        :rows="rows"
        :columns="columns"
        :loading="loading"
        :filter="filter"
        :toggleModal="toggleModal"
        :actions="actions"
        labelAdd="Agregar Cuenta Bancaria"
        labelTitle="Empleados"
      />
      <profile-form
        :modal="modal"
        :closeModal="closeModal"
        :currentItem="currentItem"
        :handleSubmit="handleSubmit"
      />
    </section>
    <section>
      <h1 class="text-h4 box-shadow section">Historial de pagos</h1>
      <profile-list
        :rows="rows"
        :columns="columns2"
        :loading="loading"
        :filter="filter"
        :toggleModal="toggleModal"
        :actions="actions"
        labelAdd="Agregar Cuenta Bancaria"
        labelTitle="Empleados"
      />
      <profile-form
        :modal="modal"
        :closeModal="closeModal"
        :currentItem="currentItem"
        :handleSubmit="handleSubmit"
      />
    </section>
  </q-page>
</template>

<script>
import Swal from "sweetalert2";
import { ref, computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import useUser from "src/modules/user/composables/useUser";
import ProfileForm from "./components/ProfileForm.vue";
import ProfileList from "./components/ProfileList.vue";
import { useQuasar } from "quasar";
import useUI from "src/composables/useUI";

// Constants
import {
  MODULE,
  SET_ITEMS,
  SET_CURRENT_ITEM,
  SAVE_EDIT,
  GET_CURRENT_ITEM,
  EDIT,
  ADD,
  DESTROY,
  PARENT_MODULE,
  CURRENT_MODULE,
} from "./ProfileConstants.js";

// Columnas de los items (columns data)
const columns = [
  {
    name: "id",
    // required: true,
    label: "id",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nameBank",
    // required: true,
    label: "Nombre del banco",
    align: "left",
    field: (row) => row.nameBank,
    sortable: true,
  },
  {
    name: "accountNumber",
    label: "Numero de cuenta",
    align: "left",
    field: (row) => row.accountNumber,
    sortable: true,
  },
  {
    name: "amount",
    label: "Rif",
    align: "left",
    field: (row) => row.amount,
    sortable: true,
  },
  {
    name: "amount",
    label: "Tipo de cuenta",
    align: "left",
    field: (row) => row.amount,
    sortable: true,
  },
  {
    name: "amount",
    label: "Nombre de titular",
    align: "left",
    field: (row) => row.amount,
    sortable: true,
  },
  {
    name: "actions",
    label: "Acciones",
    align: "left",
  },
];

const columns2 = [
  {
    name: "id",
    // required: true,
    label: "N° de Comprobante",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    label: "Monto Pagado",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "date",
    label: "Forma de Pago",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "date",
    label: "Banco",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "date",
    label: "Estado",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "date",
    label: "Fecha de pago",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "amount",
    label: "Fecha de verificacion",
    align: "left",
    field: (row) => row.amount,
    sortable: true,
  },
  {
    name: "actions",
    label: "Acciones",
    align: "left",
  },
];

const actions = {
  icon: "more_vert",
  customClass: "no-decoration",
  list: [],
};
export default {
  components: { ProfileForm, ProfileList },
  setup() {
    const { filterKey, firstCero, getCIType, getPhoneAreaCod } = useUI();
    const { savePerfil, getPerfilData, getOwnerDocument } = useUser();
    const $q = useQuasar();
    const typeCI = ref([]);

    const toggleVisibility = ref(true);
    const optionAreaCodeLocal = reactive([]);
    const optionAreaCodeCell = reactive([]);
    const documentData = reactive([]);
    const data = reactive({
      idUser: "",
      name: "",
      surname: "",
      secondName: "",
      secondSurname: "",
      email: "",
      idTypeCi: [],
      ci: "",
      address: "",
      idTypeCi: [],
      idAreaCodePhone: [],
      phone: "",
      idAreaCodeLocalPhone: [],
      localphone: "",
      phones: [],
      birthday: "",
      banks: "",
      bankAccount: "",
      documentProperty: [],
      idApartment: "",
    });
    const readonly = ref(true);
    const labelBtn = ref("Editar");
    const dataOld = reactive({
      idUser: "",
      name: "",
      surname: "",
      secondName: "",
      secondSurname: "",
      email: "",
      idTypeCi: [],
      ci: "",
      address: "",
      idTypeCi: [],
      idAreaCodePhone: [],
      phone: "",
      idAreaCodeLocalPhone: [],
      localphone: "",
      phones: [],
      birthday: "",
      banks: "",
      bankAccount: "",
      documentProperty: [],
      idApartment: "",
    });

    const store = useStore();

    const currentItem = computed(() => store.getters[`${MODULE}/${GET_CURRENT_ITEM}`]);
    const currentResidential = computed(
      () => store.getters["auth/getCurrentResidential"]
    );

    //llenamos la tabla con los empleados que hayan registrados.
    const getAll = async () => {
      console.log(store.state[PARENT_MODULE][CURRENT_MODULE], "state");
    };
    getAll();

    // Abre y cierra el modal
    const toggleModal = () => {
      store.commit("toggleModal");
    };

    // Cierra el modal y resetea nuestro currentItem
    const closeModal = () => {
      store.commit("toggleModal");
    };

    // Formulario agregar y editar
    const handleSubmit = async (data) => {
      // EDITAMOS
      if (Object.values(currentItem.value).length) {
        let target = {};
        Object.assign(target, store.state[PARENT_MODULE][CURRENT_MODULE].currentItem);
        data.idUser = store.state["auth"].id;
        Object.assign(target, data);
        // const { ok, message } = await updateBank(target);
        // if (ok) {
        //   Swal.fire({
        //     title: "Empleado",
        //     text: message.message,
        //     icon: "success",
        //     confirmButtonColor: "#388e3c",
        //   });
        // } else {
        //   Swal.fire({
        //     title: "Error",
        //     text: message.message,
        //     icon: "error",
        //     confirmButtonColor: "#388e3c",
        //   });
        // }
        // Close modal
        store.commit("toggleModal");
        store.commit(`${MODULE}/${SET_CURRENT_ITEM}`, {});
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
        return;
      }

      // GUARDAMOS NUEVO ITEM
      store.commit("toggleModal");

      data.idBank = data.banks.id;
      data.banks = data.banks.description;
      data.idUser = store.state["auth"].id;
      // const { ok, message } = await saveBank(data);
      // console.log(message);
      // if (ok) {
      //   Swal.fire("", message.message, "success");
      // } else {
      //   Swal.fire("Error", message.message, "error");
      // }
      // Close modal
      // reseteamos
      Object.keys(data).forEach((key) => {
        data[key] = "";
      });
    };

    // Acciones ligadas a sus respectivos botones, (eliminar, editar, pagar, cambiar, etc...)
    const handleDestroy = (id) => {
      // Consulta
      Swal.fire({
        title: "Confirmación",
        text: "¿Esta seguro de eliminar?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#388e3c",
        cancelButtonColor: "#d33",
        confirmButtonText: "Remover",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // const { ok, message } = await deleteBank(id);
          // if (ok) {
          //   Swal.fire("", message.message, "success");
          // } else {
          //   Swal.fire("Error", message.message, "error");
          // }
        }
      });
    };
    // Obtiene los datos del item especifico para pintarlos en el modal
    const handleEdit = (id) => {
      store.commit("toggleModal");
      store.commit(`${MODULE}/${EDIT}`, id);
    };

    actions.list = [];
    actions.list.push({
      icon: "edit",
      title: "Editar",
      fn: handleEdit,
    });
    actions.list.push({
      icon: "delete",
      title: "Eliminar",
      fn: handleDestroy,
    });

    const onSubmitPerson = async () => {
      if (
        dataOld.idUser == data.idUser &&
        dataOld.name == data.name &&
        dataOld.surname == data.surname &&
        dataOld.secondName == data.secondName &&
        dataOld.secondSurname == data.secondSurname &&
        dataOld.email == data.email &&
        dataOld.idTypeCi.id == data.idTypeCi.id &&
        dataOld.ci == data.ci &&
        dataOld.address == data.address &&
        dataOld.idAreaCodePhone.id == data.idAreaCodePhone.id &&
        dataOld.phone == data.phone &&
        dataOld.idAreaCodeLocalPhone.id == data.idAreaCodeLocalPhone.id &&
        dataOld.localphone == data.localphone &&
        dataOld.birthday == data.birthday &&
        dataOld.banks == data.banks &&
        dataOld.bankAccount == data.bankAccount &&
        dataOld.documentProperty.value == data.documentProperty.value
      ) {
        return Swal.fire({
          title: "Perfil",
          text: "No hay cambios para actualizar",
          icon: "warning",
          confirmButtonColor: "#388e3c",
        });
      }
      data.idUser = store.state["auth"].id;
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

      data.idApartment = currentResidential.value.idApartment;

      const { ok, message } = await savePerfil(data);

      if (!ok)
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
          confirmButtonColor: "#388e3c",
        });
      else {
        dataOld.idUser = data.idUser;
        dataOld.name = data.name;
        dataOld.surname = data.surname;
        dataOld.secondName = data.secondName;
        dataOld.secondSurname = data.secondSurname;
        dataOld.email = data.email;
        dataOld.idTypeCi = data.idTypeCi;
        dataOld.ci = data.ci;
        dataOld.address = data.address;
        dataOld.idAreaCodePhone = data.idAreaCodePhone;
        dataOld.phone = data.phone;
        dataOld.idAreaCodeLocalPhone = data.idAreaCodeLocalPhone;
        dataOld.localphone = data.localphone;
        dataOld.phones = data.phones;
        dataOld.birthday = data.birthday;
        dataOld.banks = data.banks;
        dataOld.bankAccount = data.bankAccount;
        dataOld.documentProperty = data.documentProperty;
        dataOld.idApartment = data.idApartment;
        Swal.fire({
          title: "Perfil",
          text: message.message,
          icon: "success",
          confirmButtonColor: "#388e3c",
        });
      }
    };

    onMounted(async () => {
      const idUser = store.state["auth"].id;

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
      const dataUser = await getPerfilData(idUser);

      if (dataUser.message.data.name) {
        data.name = dataUser.message.data.name;
        data.surname = dataUser.message.data.surname;
        data.secondName = dataUser.message.data.secondName;
        data.secondSurname = dataUser.message.data.secondSurname;
        data.ci = dataUser.message.data.ci;
        data.birthday = dataUser.message.data.birthday;
        const phone = dataUser.message.data.phones;

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

        data.idTypeCi = typeCI.value.find(
          (element) => element.id == dataUser.message.data.idTypeDocument
        );

        const respDocument = await getOwnerDocument(idUser);
        //       documentData = URL.createObjectURL(respDocument.message.data.url);
        documentData.push(respDocument.message.data);
      } else {
        readonly.value = false;
        labelBtn.value = "Guardar";
      }
    });

    return {
      columns,
      columns2,
      modal: computed(() => store.state.modal),
      filter: ref(""),
      rows: computed(() => store.state[PARENT_MODULE][CURRENT_MODULE].items),
      loading: computed(() => store.state[PARENT_MODULE][CURRENT_MODULE].loading),
      currentItem,
      actions,
      readonly,
      labelBtn,
      typeCI,
      optionAreaCodeLocal,
      optionAreaCodeCell,
      toggleModal,
      closeModal,
      handleSubmit,
      data,
      dataOld,
      documentData,
      filterKey,
      firstCero,
      onSubmitPerson,
      currentResidential,
      eventClick: () => {
        if (readonly.value == false) {
          onSubmitPerson();
        }
        readonly.value = readonly.value == true ? false : true;
        labelBtn.value = labelBtn.value == "Guardar" ? "Editar" : "Guardar";
      },
      clickOpenDocument: () => {
        let valDocument;

        documentData.forEach((element) => {
          valDocument = element.url;
          return;
        });

        window.open(valDocument, "_blank", "location=yes,status=yes");
      },
    };
  },
};
</script>

<style lang="sass">
.center
        align-content: center
.displayNone
        display: none
</style>
