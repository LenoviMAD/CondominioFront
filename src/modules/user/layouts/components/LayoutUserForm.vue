<template>
  <q-dialog v-model="modal">
    <q-card>
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm">Residencias</h4>
      </q-card-section>

      <q-card-section class="q-pt-md flex-column">
        <q-btn
          v-for="item in residentials"
          :key="item.idResidential"
          outline
          class="mb-20"
          color="primary"
          @click="onClick(item.idResidential)"
        >
          <div>
            <span>Residencia: {{ item.nameResidential }}</span
            ><br /><span>Apartamento: {{ item.nameApartment }} </span>
          </div></q-btn
        >
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, watchEffect, ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    modal: Boolean,
    //     currentItem: Object,
    //     handleSubmit: Function,
    //     closeModal: Function,
  },
  setup(props) {
    const store = useStore();
    const data = reactive({
      title: "",
      body: "",
    });

    // Actualizar estado local con el current item
    //     watchEffect(() => {
    //       if (Object.values(props.currentItem).length) {
    //         Object.assign(data, props.currentItem);
    //       } else {
    //         Object.keys(data).forEach((key) => {
    //           data[key] = "";
    //         });
    //       }
    //     });

    return {
      data,
      model: ref(null),
      name: ref(""),
      lastname: ref(""),
      email: ref(""),
      phone: ref(""),
      password: ref(""),
      confirmPassword: ref(""),
      ci: ref(""),
      onClick: async (id) => {
        store.commit("auth/setCurrentResidential", id);
        store.commit("ui/toggleModal");
      },
      residentials: computed(() => store.state["auth"].residential),

      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
};
</script>

<style>
</style>
