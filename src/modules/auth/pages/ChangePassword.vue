<template>
  <q-page class="window-height window-width row justify-center items-center custom-bg">
    <q-card square class="shadow-24" style="width: 600px; margin: 0 auto">
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm q-mb-none">
          <q-btn flat icon="arrow_back" text-color="white" to="/" title="Atrás" />
          Cambio de contraseña
        </h4>
      </q-card-section>
      <q-card-section class="q-pb-none">
        <q-form class="row q-col-gutter-sm" @submit.prevent="onSubmit">
          <span class="col-sm-12 col-md-12">
            <q-input
              v-model="data.password"
              label="Contraseña *"
              @keyup="keyUp(data.password)"
              :rules="[(val) => !!val || 'Campo requerido']"
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
            <q-tooltip v-if="longitud || mayuscula || minuscula || numero || especial">
              La contraseña debe contener lo siguiente:
              <span v-if="longitud">- Longitud entre 8 y 16 caracteres.</span>
              <span v-if="mayuscula"><br />- Al menos 1 caracter en mayúscula.</span>
              <span v-if="minuscula"><br />- Al menos 1 caracter en minúscula.</span>
              <span v-if="numero"><br />- Al menos 1 número.</span>
              <span v-if="especial"><br />- Al menos 1 caracter especial.</span>
            </q-tooltip>
          </span>
          <q-input
            v-model="data.cpassword"
            label="Confirmar Contraseña *"
            :rules="[(val) => !!val || 'Campo requerido']"
            :type="isPwd2 ? 'password' : 'text'"
            class="col-sm-12 col-md-12"
            outlined
            dense
            ><template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              /> </template
          ></q-input>
          <q-btn
            color="grey-8"
            class="full-width mb20"
            icon-right="send"
            label="Confirmar"
            type="submit"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, reactive } from "vue";
import useAuth from "../composables/useAuth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "chgPassword",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      email: "",
      password: "",
      cpassword: "",
    });
    const longitud = ref(true);
    const mayuscula = ref(true);
    const minuscula = ref(true);
    const numero = ref(true);
    const especial = ref(true);
    const { changePassword, passwordValidate } = useAuth();
    return {
      data,
      isPwd: ref(true),
      isPwd2: ref(true),
      longitud,
      mayuscula,
      minuscula,
      numero,
      especial,
      onSubmit: async () => {
        data.email = store.state.auth.email;
        console.log(data);
        // var regex =
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

        // var OK = regex.exec(data.password);
        // console.log(OK);
        if (data.password === data.cpassword) {
          if (data.password.length > 7 && data.password.length < 16) {
            const message = passwordValidate(data.password);

            if (message.length) {
              $q.notify({
                message:
                  "La contraseña no cumple los parametros establecidos. " +
                  message.message,
                color: "warning",
                icon: "warning",
              });
              return;
            } else {
              const { ok, message } = await changePassword(data);
              console.log(ok, message);
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
                router.push({ name: "login" });
              }
            }
          } else {
            $q.notify({
              message: "La contraseña debe tener una longitud entre 8 y 15 carácteres.",
              color: "warning",
              icon: "warning",
            });
          }
        } else {
          $q.notify({
            message: "Las contraseñas no coinciden.",
            color: "warning",
            icon: "warning",
          });
        }
      },

      keyUp: (password) => {
        var regexUpper = /[A-Z]/;
        var regexLower = /[a-z]/;
        var regexSpecial = /[$@$!#.%*?&]/;
        var regexDigit = /[0-9]/;

        longitud.value = password.length < 8 ? true : false;

        var OKmayu = regexUpper.exec(password);
        mayuscula.value = OKmayu ? false : true;

        var OKminu = regexLower.exec(password);
        minuscula.value = OKminu ? false : true;

        var OKspe = regexSpecial.exec(password);
        especial.value = OKspe ? false : true;

        var OKdigit = regexDigit.exec(password);
        numero.value = OKdigit ? false : true;
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

.mb20 {
  margin-bottom: 20px;
}
</style>
