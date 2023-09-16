<template>
  <sen-card-icons class="row q-gutter-x-md justify-between" :iconCards="iconCards" />
</template>
<script>
import { reactive, computed, watchEffect, ref, onMounted } from "vue";
import { useStore } from "vuex";
import useAdmin from "src/modules/admin/composables/useAdmin";
const iconCards = [
  {
    iconName: "work",
    iconClass: "custom-icon bg-light-green-1",
    iconColor: "light-green-4",
    summary: "",
    title: "Recibos por Pagar",
  },
  {
    iconName: "store",
    iconClass: "custom-icon bg-red-1",
    iconColor: "red-4",
    summary: "",
    title: "Historial de Pago",
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
<style></style>
