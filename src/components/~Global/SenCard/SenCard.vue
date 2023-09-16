<template>
  <q-card>
    <q-card-section
      :style="{ 'background-image': background_image }"
      class="text-white"
      :id="id"
    >
      <div class="text-h2 text-center">
        <q-icon :name="icon"></q-icon>
      </div>
      <div class="text-h6 text-center border-botton">
        {{ name }}
      </div>
    </q-card-section>
    <q-card-section
      class="q-pa-none"
      :style="{ 'background-image': background_image2 }"
    >
      <div class="text-h5 text-center">
        {{ cost }}
      </div>
      <div class="text-h7 text-center border-botton">
        {{ profile }}
      </div>
      <div class="text-h7 text-center border-botton">
        {{ user }}
      </div>
      <div class="text-h7 text-center border-botton">
        {{ email }}
      </div>
      <div class="text-h7 text-center border-botton">
        {{ billboard }}
      </div>
      <q-card-actions vertical align="center" class="pbtn">
        <!-- <sen-btn
          label="Comprar"
          customClass="wbtn"
          
        ></sen-btn> -->
        <q-btn
          :style="{ background: background_image }"
          @click="clickBtn(id)"
          :disable="disableButton"
          class="text-white"
          >Comprar</q-btn
        >
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from "vue";
import useUI from "src/composables/useUI";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SenCard",
  components: {
    SenBtn: defineAsyncComponent(() =>
      import("components/~Global/SenBtn/SenBtn")
    ),
  },

  props: {
    id: Number,
    name: String,
    background_image: String,
    background_image2: String,
    title: String,
    icon: String,
    cost: String,
    profile: String,
    email: String,
    user: String,
    billboard: String,
    clickBtn: Function,
    disableButton: Boolean,
  },

  setup(props) {
    const router = useRouter();
    const { toggleModal } = useUI();

    return {
      toggleModal,
      // onClick: async () => {
      //   router.push({ name: "confirmPlan" });
      // },
    };
  },
});
</script>

<style scoped>
.border-botton {
  padding: 5px;
  /* border-bottom: 1px solid; */
}

.pbtn {
  padding: 7%;
}

.wbtn {
  width: 35%;
}
</style>
