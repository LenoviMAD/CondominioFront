<template>
  <q-page>
    <q-btn
      flat
      icon="arrow_back_ios"
      text-color="black"
      :to="{ name: 'dashboardAdmin' }"
      title="Atrás"
    />
    <section class="section">
      <q-form class="row q-col-gutter-md" @submit.prevent="onSubmitPerson">
        <div class="row q-col-gutter-md col-sm-6 col-md-6">
          <h5 class="col-sm-12 col-md-12">Datos Personales</h5>
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
          <q-input
            label="Cédula *"
            class="col-sm-6 col-md-6"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.ci"
            mask="########"
            outlined
            dense
          />
          <q-input
            label="Fecha de Nacimiento"
            stack-label
            class="col-sm-6 col-md-6"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.birthday"
            type="date"
            outlined
            dense
          />
          <q-input
            label="Teléfono Celular *"
            class="col-sm-6 col-md-6"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.phone"
            mask="####-###-####"
            outlined
            dense
          />

          <q-input
            label="Teléfono Local *"
            class="col-sm-6 col-md-6"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.localphone"
            mask="####-###-####"
            outlined
            dense
          />
          <div class="full-width" style="display: flex; justify-content: end">
            <q-btn
              label="Actualizar"
              type="submit"
              color="primary"
              class="q-mr-sm"
            />
          </div>
        </div>
        <div class="row col-md-6">
          <div class="col-12">
            <div class="">
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-subtitle1 text-center">
                  Caption
                </div>
              </q-img>
            </div>
            <div class="">
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-subtitle1 text-center">
                  Caption
                </div>
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
import useAdmin from "src/modules/admin/composables/useAdmin";
import Swal from "sweetalert2";
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";

import ProfileForm from "./components/ProfileForm.vue";
import ProfileList from "./components/ProfileList.vue";

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
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    label: "Fecha",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "amount",
    label: "Monto",
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
    const data = reactive({
      name: "",
      surname: "",
      secondName: "",
      secondSurname: "",
      email: "",
      ci: "",
      address: "",
      phone: "",
      localphone: "",
      birthday: "",
      banks: "",
      bankAccount: "",
    });

    const dataOld = reactive({
      name: "",
      surname: "",
      secondName: "",
      secondSurname: "",
      email: "",
      ci: "",
      address: "",
      phone: "",
      localphone: "",
      birthday: "",
    });

    const { updatePerson, deleteBank, updateBank, getBank, saveBank, getUser } =
      useAdmin();
    const store = useStore();

    const currentItem = computed(
      () => store.getters[`${MODULE}/${GET_CURRENT_ITEM}`]
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
        Object.assign(
          target,
          store.state[PARENT_MODULE][CURRENT_MODULE].currentItem
        );
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
      console.log(data, dataOld);
      if (
        data.name == dataOld.name &&
        data.surname == dataOld.surname &&
        data.secondName == dataOld.secondName &&
        data.secondSurname == dataOld.secondSurname &&
        data.email == dataOld.email &&
        data.ci == dataOld.ci &&
        data.address == dataOld.address &&
        data.phone == dataOld.phone &&
        data.localphone == dataOld.localphone &&
        data.birthday == dataOld.birthday
      ) {
        return Swal.fire({
          title: "Perfil",
          text: "No hay cambios para actualizar",
          icon: "warning",
          confirmButtonColor: "#388e3c",
        });
      }

      data.id = store.state["auth"].id;
      const { ok, message } = await updatePerson(data);

      dataOld.name = data.name;
      dataOld.surname = data.surname;
      dataOld.secondName = data.secondName;
      dataOld.secondSurname = data.secondSurname;
      dataOld.email = data.email;
      dataOld.ci = data.ci;
      dataOld.address = data.address;
      dataOld.phone = data.phone;
      dataOld.localphone = data.localphone;
      dataOld.birthday = data.birthday;

      if (!ok)
        Swal.fire({
          title: "Error",
          text: message.message,
          icon: "error",
          confirmButtonColor: "#388e3c",
        });
      else {
        Swal.fire({
          title: "Perfil",
          text: message.message,
          icon: "success",
          confirmButtonColor: "#388e3c",
        });
      }
    };

    return {
      columns,
      columns2,
      modal: computed(() => store.state.modal),
      filter: ref(""),
      rows: computed(() => store.state[PARENT_MODULE][CURRENT_MODULE].items),
      loading: computed(
        () => store.state[PARENT_MODULE][CURRENT_MODULE].loading
      ),
      currentItem,
      actions,
      toggleModal,
      closeModal,
      handleSubmit,
      data,
      dataOld,
      onSubmitPerson,
    };
  },
};
</script>

<style lang="sass">
</style>
