<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-white text-grey">
      <q-toolbar
        class="bottom-header row justify-between"
        v-if="route.path !== '/admin/config'"
      >
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div>
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
            round
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
</template>

<script>
import { useRoute } from "vue-router";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
const linksList = [
  {
    title: "Inicio",
    icon: "home",
    to: "/admin",
  },
  {
    title: "Operadores",
    icon: "supervisor_account",
    to: "/admin/admins",
  },
  // {
  //   title: "Torres",
  //   icon: "business",
  //   to: "/admin/buildings",
  // },
  {
    title: "Torres",
    icon: "business",
    to: "/admin/tower",
  },
  {
    title: "Co-Propietarios",
    icon: "supervised_user_circle",
    to: "/admin/owners",
  },
  {
    title: "Recibo",
    icon: "receipt_long",
    to: "/admin/receipt",
  },
  {
    title: "Deudores",
    icon: "query_stats",
    to: "/admin/defaulters",
  },
  {
    title: "Registros de Pagos",
    icon: "payments",
    to: "/admin/paymentsAdmin",
  },
  // {
  //   title: "Gastos",
  //   icon: "savings",
  //   to: "/admin/expenses",
  // },
  // {
  //   title: "Propietarios",
  //   icon: "accessibility_new",
  //   to: "/admin/owners",
  // },
  // {
  //   title: "Facturacion",
  //   icon: "trending_up",
  //   to: "/admin/invoices",
  // },
  // {
  //   title: "Cobros",
  //   icon: "business",
  //   to: "/admin/charges",
  // },
  // {
  //   title: "Noticias",
  //   icon: "description",
  //   to: "/admin/news",
  // },
  // {
  //   title: "Area del propietario",
  //   icon: "perm_identity",
  //   deepLinks: [
  //     {
  //       title: "Principal",
  //       to: "/admin/section-owner",
  //     },
  //     {
  //       title: "Recibo de cobros",
  //       to: "/admin/section-owner/receipt-of-collections",
  //     },
  //     {
  //       title: "Historial de pago",
  //       to: "/admin/section-owner/payment-history",
  //     },
  //     {
  //       title: "Pantalla de exito??",
  //       to: "/admin/section-owner/success",
  //     },
  //   ],
  // },
];
const breadcrumbList = [
  {
    label: "Inicio",
    icon: "home",
    to: "/admin",
  },
  {
    label: "Inicio",
    icon: "home",
    to: "/admin",
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
      to: "/admin/profile",
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
  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(true);
    const route = useRoute();

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      linksList,
      breadcrumbList,
      btnDropdown,
      leftDrawerOpen,
      toggleLeftDrawer,
      route,
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
