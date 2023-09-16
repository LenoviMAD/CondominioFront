<template>
  <towers v-if="visible != true" />
  <towers-view v-else />
</template>

<script>
import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import useAdmin from "src/modules/admin/composables/useAdmin";

// Iternals components
import Towers from "./components/Towers.vue";
import TowersView from "./components/TowersView.vue";

export default {
  components: { Towers, TowersView },
  setup() {
    const { getConfigPay } = useAdmin();
    const $q = useQuasar();
    const store = useStore();
    const visible = ref("");

    onMounted(async () => {
      const idUser = store.state["auth"].id;

      const { ok, message } = await getConfigPay(idUser);
      console.log(message, "miraaar");
      if (message.data) {
        store.commit("admin/setTowerVisible", true);
      } else {
        store.commit("admin/setTowerVisible", false);
      }
    });

    return {
      onMounted,
      visible: computed(() => store.state["admin"].towerVisible),
    };
  },
};
</script>

<style></style>
