<template>
  <!-- jumbotron -->
  <section
    class="q-mb-xl"
    style="background: #1e232d; position: relative; padding: 50px 0"
  >
    <article>
      <header>
        <h2 class="text-h3 text-weight-bold text-center q-my-md">
          <span class="text-white"
            >El mejor software de gestión de condominios</span
          >
          <small class="text-h6 text-grey text-weight-regular block q-mt-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Omnis ullam impedit mollitia consectetur culpa porro at repudiandae
            <br />
            sed recusandae, earum aspernatur ipsa ex, temporibus modi dolor non
            consequatur eaque est!
          </small>
        </h2>
      </header>
      <footer class="text-center">
        <q-btn
          size="lg"
          rounded
          label="¡Comienza ya!"
          to="/signin"
          class="q-mr-sm text-grey-9"
          color="white"
        />
        <q-btn
          color="white"
          outline
          rounded
          size="lg"
          label="Ver más"
          @click="(e) => test('about')"
        />
      </footer>
    </article>
    <aside class="text-center">
      <img src="~assets/dashboard.png" alt="mi app" style="max-width: 80%" />
    </aside>
    <div
      class="effectiv"
      style="bottom: -11px; left: 0; position: absolute; right: 0"
    >
      <img
        class="svg"
        src="https://askbootstrap.com/preview/osahan-soft-themez/img/bg.svg"
        style="max-width: 100%; min-width: 100%; width: 100%"
        alt="waves"
      />
    </div>
  </section>
  <!-- /jumbotron -->
  <!-- about-video -->
  <section id="about" class="row q-mb-xl container">
    <header class="col-6 q-pr-xl row items-center">
      <div>
        <h2 class="text-h4 text-weight-bold" style="color: #1e232d !important">
          Nuestra aplicación te da control. <br />
          ¿Cómo funciona?
        </h2>
        <p class="text-grey text-justify text-weight-regular block">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          natus velit aliquam ipsam. Dolor excepturi vitae laudantium, eveniet
          quis eos incidunt natus ullam! Ab eveniet porro optio cupiditate
          temporibus quos? Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Deserunt natus velit aliquam ipsam. Dolor excepturi vitae
          laudantium, eveniet quis eos incidunt natus ullam! Ab eveniet porro
          optio cupiditate temporibus quos?
        </p>
        <p class="text-grey text-justify text-weight-regular block">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          natus velit aliquam ipsam. Dolor excepturi vitae laudantium, eveniet
          quis eos incidunt natus ullam! Ab eveniet porro optio cupiditate
          temporibus quos?
        </p>
        <q-btn
          label="Inicia con nosotros"
          to="/signin"
          outline
          color="grey-8"
        />
      </div>
    </header>
    <div class="col-6">
      <q-video
        src="https://www.youtube.com/embed/Fy9SdZLBTOo"
        :ratio="16 / 9"
      />
    </div>
  </section>
  <!-- /about-video -->
  <!-- icons -->
  <section class="row separator q-my-xl justify-around">
    <div class="card text-center q-gutter-x-sm">
      <q-img
        style="width: 64px"
        class="rounded-borders"
        src="~assets/icon1.png"
      />
      <header class="text-center">
        <h3 class="text-h6 q-ma-none">Soporte 24/7</h3>
        <p class="text-caption text-grey q-ma-none">
          It is a long established fact that a reader will <br />
          be distracted by the readable content of a page <br />
          when looking at its layout.
        </p>
      </header>
    </div>
    <div class="card text-center q-gutter-x-sm">
      <q-img
        style="width: 64px"
        class="rounded-borders"
        src="~assets/icon2.png"
      />
      <header>
        <h3 class="text-h6 q-ma-none">Excelente documentación</h3>
        <p class="text-caption text-grey q-ma-none">
          It is a long established fact that a reader will <br />
          be distracted by the readable content of a page <br />
          when looking at its layout.
        </p>
      </header>
    </div>
    <div class="card text-center q-gutter-x-sm">
      <q-img
        style="width: 64px"
        class="rounded-borders"
        src="~assets/icon3.png"
      />
      <header>
        <h3 class="text-h6 q-ma-none">Diseño responsivo</h3>
        <p class="text-caption text-grey q-ma-none">
          It is a long established fact that a reader will <br />
          be distracted by the readable content of a page <br />
          when looking at its layout.
        </p>
      </header>
    </div>
  </section>
  <!-- /icons -->
  <!-- feature-app -->
  <section class="row q-mb-xl q-py-xl container" style="background: #f1f3fb">
    <div class="col-6 q-pr-xl">
      <q-img
        src="https://yasirkareem.com/beginn/img/background/dashbord-stay-updated.png"
        style="box-shadow: 0px 21px 81px 0px rgb(0 0 0 / 9%)"
      />
    </div>
    <header class="col-6 row items-center">
      <div>
        <h2 class="text-h4 text-weight-bold" style="color: #1e232d !important">
          Nuestra aplicación te da control. <br />
          ¿Cómo funciona?
        </h2>
        <p class="text-grey text-justify text-weight-regular block">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          natus velit aliquam ipsam. Dolor excepturi vitae laudantium, eveniet
          quis eos incidunt natus ullam! Ab eveniet porro optio cupiditate
          temporibus quos? Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Deserunt natus velit aliquam ipsam. Dolor excepturi vitae
          laudantium, eveniet quis eos incidunt natus ullam! Ab eveniet porro
          optio cupiditate temporibus quos?
        </p>
        <p class="text-grey text-justify text-weight-regular block">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          natus velit aliquam ipsam. Dolor excepturi vitae laudantium, eveniet
          quis eos incidunt natus ullam! Ab eveniet porro optio cupiditate
          temporibus quos?
        </p>
      </div>
    </header>
  </section>
  <!-- /feature-app -->
  <!-- Seccion pricing -->
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
  <!-- End Pricing -->
  <!-- testimonials -->
  <section class="row container q-py-xl q-mb-xl">
    <header class="col-6 row items-center q-pr-xl">
      <div>
        <h2 class="text-h4 text-weight-bold" style="color: #1e232d !important">
          Que dicen nuestros clientes. <br />
          ¿Acerca de nosotros?
        </h2>
        <p class="text-grey text-justify text-weight-regular block">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
          natus velit aliquam ipsam. Dolor excepturi vitae laudantium, eveniet
          quis eos incidunt natus ullam! Ab eveniet porro optio cupiditate
          temporibus quos? Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Deserunt natus velit aliquam ipsam. Dolor excepturi vitae
          laudantium, eveniet quis eos incidunt natus ullam! Ab eveniet porro
          optio cupiditate temporibus quos?
        </p>
      </div>
    </header>
    <div class="col-6">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        padding
        arrows
        height="300px"
      >
        <q-carousel-slide :name="1" class="column no-wrap">
          <div
            class="
              row
              fit
              justify-start
              items-center
              q-gutter-xs q-col-gutter
              no-wrap
            "
          >
            <q-card class="col-6">
              <q-card-section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae provident eos mollitia vel eaque beatae temporibus
                quis officia sit, inventore obcaecati rem recusandae distinctio
                voluptates quia ratione culpa ipsum illum.
              </q-card-section>
              <q-card-section>
                <h3 class="text-h5 font-weight-bold q-my-none">
                  Ryhan dahl
                  <small class="text-h6 text-grey text-weight-regular block">
                    Ui/Ux Designer
                  </small>
                </h3>
              </q-card-section>
            </q-card>
            <q-card class="col-6 q-ml-sm">
              <q-card-section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae provident eos mollitia vel eaque beatae temporibus
                quis officia sit, inventore obcaecati rem recusandae distinctio
                voluptates quia ratione culpa ipsum illum.
              </q-card-section>
              <q-card-section>
                <h3 class="text-h5 font-weight-bold q-my-none">
                  Ryhan dahl
                  <small class="text-h6 text-grey text-weight-regular block">
                    Ui/Ux Designer
                  </small>
                </h3>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap">
          <div
            class="
              row
              fit
              justify-start
              items-center
              q-gutter-xs q-col-gutter
              no-wrap
            "
          >
            <q-img
              class="rounded-borders col-6 full-height"
              src="https://cdn.quasar.dev/img/material.png"
            />
            <q-img
              class="rounded-borders col-6 full-height"
              src="https://cdn.quasar.dev/img/donuts.png"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </section>
  <!-- /testimonials -->
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useUI from "src/composables/useUI";
import { ref, reactive, computed, onMounted } from "vue";
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;
import { defineComponent, defineAsyncComponent } from "vue";

export default {
  name: "Pricing",
  components: {
    CardPricing: defineAsyncComponent(() =>
      import("components/~Global/SenCard/SenCard")
    ),
    ModalPay: defineAsyncComponent(() =>
      import("components/~Global/SenModalPay/SenModalPay")
    ),
  },

  // methods: {
  //   ...mapMutations(["mostrarModal"], ["ocultarModal"]),
  // },
  setup() {
    const router = useRouter();
    const store = useStore();
    const pricing_data = reactive([]);
    onMounted(async () => {
      const { getPlan, getTimePlan } = useUI();
      const { ok, message } = await getPlan();
      console.log(message.data, "message");

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
      console.log(pricing_data, "pricingData");

      await getTimePlan();
    });

    return {
      slide: ref(1),
      autoplay: ref(true),
      year: new Date().getFullYear(),
      pricing_data,

      onMounted,

      onClick: async (id) => {
        store.commit("ui/setCurrentItem", id);
        console.log(store.state["ui"].currentItem, "currentItem");
        router.push({ name: "confirmPlan" });
      },
    };
  },
};
</script>

<style>
</style>