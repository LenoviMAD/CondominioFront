<template>
  <q-page class="window-height window-width row justify-center items-center custom-bg">
    <q-card square class="shadow-24" style="width: 350px; margin: 0 auto">
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm q-mb-none">
          <q-btn flat icon="arrow_back" text-color="white" to="/" title="Atrás" />
          Iniciar sesión
        </h4>
      </q-card-section>
      <q-card-section class="q-pb-none">
        <q-form class="row q-col-gutter-sm" @submit.prevent="onSubmit">
          <q-input
            label="Email *"
            v-model="data.email"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-12 col-md-12"
            outlined
            dense
          />
          <q-input
            v-model="data.password"
            label="Contraseña *"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-12 col-md-12"
            :type="isPwd ? 'password' : 'text'"
            outlined
            dense
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>
          <q-btn
            color="grey-8"
            class="full-width"
            icon-right="send"
            label="Iniciar sesión"
            type="submit"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center q-pa-sm">
        <router-link class="text-grey-6" :to="{ name: 'plans' }">
          <p>¿Eres nuevo? Registrate</p>
        </router-link>
        <router-link class="text-grey-6" to="/">
          <p>Olvidé mi contraseña</p>
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, reactive } from "vue";
import useAuth from "../composables/useAuth";
import useAdmin from "src/modules/admin/composables/useAdmin";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default {
  name: "login",
  setup() {
    const store = useStore();
    const $q = useQuasar();

    const router = useRouter();
    const data = reactive({
      email: "",
      password: "",
    });
    const { loginUser, getIdResidential } = useAuth();
    return {
      data,
      isPwd: ref(true),
      onSubmit: async () => {
        const { ok, message } = await loginUser(data);

        console.log(message);

        if (!ok)
          $q.notify({
            message: message.message != null ? message.message : message,
            color: "negative",
            icon: "error",
          });
        else {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });

          const id = store.state["auth"].id;
          await getIdResidential(id);
          if (message.data.first == 0) {
            if (message.data.idRole == 2) {
              if (message.data.configPay == 0) {
                if (message.data.adminCount == 0 && message.data.towerCount == 0) {
                  router.push({ name: "register" });
                } else if (message.data.adminCount == 1 && message.data.towerCount == 0) {
                  router.push({ name: "admins" });
                } else if (message.data.adminCount == 1 && message.data.towerCount == 1) {
                  router.push({ name: "tower" });
                } else {
                  router.push({ name: "dashboardAdmin" });
                }
              } else {
                router.push({ name: "dashboardAdmin" });
              }
            } else if (message.data.idRole == 4) {
              router.push({ name: "profileUser" });
            }
          } else {
            router.push({ name: "changePassword" });
          }
        }
      },
    };
  },
};
</script>

<style lang="scss">
.custom-bg {
  background-image: url(~assets/top-view.jpg);
  background-size: cover;
}
.custom-bg-primary {
  background-color: #1e232d;
}
</style>
