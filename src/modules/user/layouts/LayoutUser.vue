<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-white text-grey">
      <q-toolbar
        class="bottom-header row justify-between"
        v-if="route.path !== '/admin/config'"
      >
        <div class="col-sm-6 col-md-6">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            class=""
            @click="toggleLeftDrawer"
          />
        </div>

        <div class="row justify-end col-sm-6 col-md-6" style="display: flex">
          <q-btn
            flat
            dense
            @click="toggleModal()"
            text-color="grey-8"
            :label="`Residencia: ` + currentResidential.nameResidential"
            class="q-mr-sm q-pt-sm col-sm-6 col-md-6"
          >
            <!-- <q-badge round floating color="teal">8</q-badge> -->
          </q-btn>

          <q-btn
            flat
            dense
            text-color="grey-8"
            icon="notifications"
            class="q-mr-sm"
            title="Perfil"
          >
            <!-- <q-badge round floating color="teal">8</q-badge> -->
          </q-btn>
          <sen-btn-dropdown :btnDropdown="btnDropdown" />
        </div>
      </q-toolbar>
      <q-toolbar class="bottom-header" style="border-top: 1px solid #ebedf3">
        <sen-breadcrumbs :breadcrumbList="breadcrumbList" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      show-if-above
      class="bg-navbar"
      v-if="route.path !== '/admin/config'"
    >
      <q-list>
        <q-item-label header class="custom-title-header q-mb-sm">
          Gestion Condominio
        </q-item-label>
        <sen-menu-links :linksList="linksList" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="container q-pt-lg">
        <router-view />
      </q-page>
    </q-page-container>

    <!-- <q-footer reveal bordered class="bg-white text-grey-8">
      <q-toolbar>
        <q-toolbar-title>
          <div>Copyright © 2021</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>

  <layout-user-form :modal="modal" />
</template>

<script>
import { useRoute } from "vue-router";
import { defineComponent, ref, computed } from "vue";
import LayoutUserForm from "./components/LayoutUserForm.vue";
import { useStore } from "vuex";

const linksList = [
  {
    title: "Inicio",
    icon: "home",
    to: "/user",
  },
  {
    title: "Recibo por pagar",
    icon: "receipt_long",
    to: "/user/paymentsTable",
  },
  {
    title: "Historial de pago",
    icon: "paid",
    to: "/user",
  },
];
const breadcrumbList = [
  {
    label: "Inicio",
    icon: "home",
    to: "/user",
  },
];
const btnDropdown = {
  icon: "manage_accounts",
  customClass: "no-decoration",
  list: [
    {
      title: "Configuración",
      to: "",
      icon: "settings",
    },
    {
      title: "Perfil",
      to: "/user/profile",
      icon: "perm_identity",
    },
    {
      title: "Salir",
      to: "/",
      icon: "power_settings_new",
    },
  ],
};

export default defineComponent({
  components: { LayoutUserForm },
  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(true);
    const route = useRoute();
    // Abre y cierra el modal
    const toggleModal = () => {
      store.commit("ui/toggleModal");
    };

    // Cierra el modal y resetea nuestro currentItem
    const closeModal = () => {
      store.commit("ui/toggleModal");
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      modal: computed(() => store.state["ui"].isModalOpen),
      linksList,
      breadcrumbList,
      btnDropdown,
      leftDrawerOpen,
      toggleLeftDrawer,
      route,
      toggleModal,
      closeModal,
      currentResidential: computed(() => store.state["auth"].currentResidential),
    };
  },
});
</script>
<style lang="scss">
.bg-navbar {
  background: #1e232d !important;
}
.custom-title-header {
  background: #1a1a27 !important;
  color: white;
  line-height: 1 !important;
  font-size: 1.5em;
}
.body--light {
  background: #eef0f8 !important;
}
.q-badge--floating {
  top: -1px;
  right: -1px;
}
</style>
