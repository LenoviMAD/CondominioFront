<template>
  <q-page
    class="window-height window-width row justify-center items-center custom-bg"
  >
    <q-card square class="shadow-24" style="width: 750px; margin: 0 auto">
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm q-mb-none">
          <q-btn
            flat
            icon="arrow_back"
            text-color="white"
            :to="{ name: 'login' }"
            title="Atrás"
          />
          Planes Residenciales
        </h4>
      </q-card-section>
      <q-card-section class="q-pb-none">
        <section id="planes" class="q-pb-lg">
          <div
            class="row q-col-gutter-sm q-px-sm"
            style="justify-content: space-evenly"
          >
            <div
              class="col-lg-3 col-md-3 col-xs-12 col-sm-12"
              v-for="(pricing_item, pricing_index) in pricing_data"
            >
              <card-pricing
                :name="pricing_item.name"
                :id="pricing_item.id"
                :icon="pricing_item.icon"
                :cost="pricing_item.cost"
                :space="pricing_item.space"
                :profile="pricing_item.profile"
                :user="pricing_item.user"
                :email="pricing_item.email"
                :billboard="pricing_item.billboard"
                :background_image="pricing_item.background_image"
                :background_image2="pricing_item.background_image2"
                :disableButton="pricing_item.disableButton"
                :clickBtn="onClick"
              ></card-pricing>
            </div>
          </div>
        </section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  defineComponent,
  defineAsyncComponent,
} from "vue";
import { useStore } from "vuex";
import useAuth from "../composables/useAuth";
import useUI from "src/composables/useUI";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "confirmPlan",
  components: {
    CardPricing: defineAsyncComponent(() =>
      import("components/~Global/SenCard/SenCard")
    ),
    ModalPay: defineAsyncComponent(() =>
      import("components/~Global/SenModalPay/SenModalPay")
    ),
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = ref({
      email: "",
      password: "",
    });
    const pricing_data = reactive([]);
    const { loginUser } = useAuth();

    onMounted(async () => {
      const { getPlan, getTimePlan } = useUI();
      const { ok, message } = await getPlan();
      console.log(message, "message");

      message.data.forEach((element) => {
        console.log(element, "keyyyy");
        const values = {
          id: element.id,
          name: element.name,
          cost: element.cost,
          space: element.space,
          profile: element.profile,
          user: element.user,
          email: element.email,
          billboard: element.billboard,
          //  icon: ,
          // background_image:
          //   "linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%)",
          // background_image2:
          //   "linear-gradient(-225deg, rgba(93, 159, 255, 0.64) 0%, rgba(107, 187, 255, 0.64) 100%)",
          // disableButton: false,
        };
        switch (element.id) {
          case 1:
            values.icon = "home";
            values.billboard = "Cartelera digital";
            values.background_image =
              "linear-gradient(to right, #7eed6e 0%, #79ec69 100%)";
            values.background_image2 =
              "linear-gradient(to right, rgba(126, 237, 110, 0.64) 0%, rgba(121, 236, 105, 0.64) 100%)";
            values.disableButton = false;
            break;
          case 2:
            values.icon = "apartment";
            values.billboard = "";
            values.background_image =
              "linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%)";
            values.background_image2 =
              "linear-gradient(-225deg, rgba(93, 159, 255, 0.64) 0%, rgba(107, 187, 255, 0.64) 100%)";
            values.disableButton = true;
            break;
          case 3:
            values.icon = "home_work";
            values.billboard = "";
            values.background_image =
              "linear-gradient(to right, #cd9dff 0%, #ad69d2 100%)";
            values.background_image2 =
              "linear-gradient(to right, rgba(205, 157, 255, 0.64),rgba(173, 105, 210, 0.64))";
            values.disableButton = true;
            break;

          default:
            break;
        }
        pricing_data.push(values);
      });

      await getTimePlan();
    });

    return {
      data,
      onSubmit: async () => {
        // const { ok, message } = await loginUser(data.value);
        // console.log(message.data.first)
        // if (!ok) Swal.fire("Error", message, "error");
        // else {
        //   Swal.fire("Bienvenido", message.message, "success");
        //   console.log(message);
        //   if (message.data.first == 0) {
        //     router.push({ name: "Home" });
        //   } else {
        //     router.push({ name: "changePassword" });
        //   }
        // }
      },
      onClick: async (id) => {
        store.commit("ui/setCurrentItem", id);
        router.push({ name: "confirmPlan" });
      },
      pricing_data,
    };
  },
};
</script>

<style lang="scss">
.custom-bg {
  background: url(~assets/top-view.jpg) no-repeat center center fixed;
  background-size: cover;
}
.custom-bg-primary {
  background-color: #1e232d;
}
</style>
