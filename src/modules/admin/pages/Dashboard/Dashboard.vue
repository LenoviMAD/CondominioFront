<template>
  <sen-card-icons
    class="row q-gutter-x-md justify-between"
    :iconCards="iconCards"
  />
</template>
<script>
import { reactive, computed, watchEffect, ref, onMounted } from "vue";
import { useStore } from "vuex";
import useAdmin from "src/modules/admin/composables/useAdmin";
const iconCards = [
  {
    iconName: "accessibility_new",
    iconClass: "custom-icon bg-deep-purple-1",
    iconColor: "deep-purple-4",
    summary: "",
    title: "Usuarios",
  },
  {
    iconName: "business",
    iconClass: "custom-icon bg-cyan-1",
    iconColor: "cyan-4",
    summary: "",
    title: "Torres",
  },
  {
    iconName: "store",
    iconClass: "custom-icon bg-red-1",
    iconColor: "red-4",
    summary: "",
    title: "Apartamentos",
  },
  {
    iconName: "work",
    iconClass: "custom-icon bg-light-green-1",
    iconColor: "light-green-4",
    summary: "",
    title: "Clientes",
  },
];

export default {
  setup() {
    const store = useStore();
    //Cargamos tanto los contadores
    return {
      iconCards,
    };
  },
};
</script>
<style>
</style>