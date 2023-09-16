<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      header-class="my-special-class"
      alternative-labels
      color="primary"
      inactive-color="grey-8"
      animated
    >
      <q-step :name="1" icon="perm_identity" :done="step > 1">
        <header class="text-center q-mb-lg">
          <h3 class="q-my-sm text-weight-light">Configurar torres</h3>
        </header>
        <q-form class="row q-col-gutter-md">
          <q-input
            label="Nombre de torre 1 *"
            outlined
            dense
            lazy-rules
            type="text"
            class="col-sm-12 col-md-12"
          />
          <q-input
            label="Nombre de torre 2 *"
            outlined
            dense
            lazy-rules
            type="text"
            class="col-sm-12 col-md-12"
          />
          <q-input
            label="Nombre de torre 3 *"
            outlined
            dense
            lazy-rules
            type="text"
            class="col-sm-12 col-md-12"
          />
        </q-form>
      </q-step>

      <q-step :name="2" icon="home" :done="step > 2">
        <header class="text-center q-mb-lg">
          <h3 class="q-my-sm text-weight-light">Configura donde vives</h3>
        </header>
        <q-form class="row q-col-gutter-md">
          <q-select
            v-model="model1"
            :options="options"
            outlined
            dense
            class="col-sm-6 col-md-6"
            label="Torre"
          />
          <q-select
            v-model="model1"
            :options="options"
            outlined
            dense
            class="col-sm-6 col-md-6"
            label="Piso"
          />
          <q-input
            label="Apartamento *"
            outlined
            dense
            lazy-rules
            type="number"
            class="col-sm-6 col-md-6"
          />
          <q-input
            label="Itercomunicador"
            outlined
            dense
            lazy-rules
            type="number"
            class="col-sm-6 col-md-6"
          />
          <q-input
            label="Puesto de estacionamiento *"
            outlined
            dense
            lazy-rules
            type="number"
            class="col-sm-6 col-md-6"
          />
          <q-input
            outlined
            label="Alicuota % *"
            type="number"
            dense
            lazy-rules
            class="col-sm-6 col-md-6"
          />
        </q-form>
      </q-step>

      <q-step :name="3" icon="collections">
        <header class="text-center q-mb-lg">
          <h3 class="q-my-sm text-weight-light">
            Configura fecha limite para los pagos mensuales
          </h3>
        </header>
        <q-form class="text-center">
          <q-select
            class="q-mb-md"
            v-model="model"
            :options="options"
            outlined
            style="max-width: 50%; margin-left: auto; margin-right: auto;"
            dense
            label="Dia Limite para los pagos *"
          />
          <q-input
            label="Porcentaje de penalización de morosidad *"
            outlined
            dense
            lazy-rules
            type="number"
            style="max-width: 50%; margin-left: auto; margin-right: auto;"
          />
        </q-form>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="row justify-end">
          <q-btn
            v-if="step > 1"
            outline
            color="grey-8"
            @click="$refs.stepper.previous()"
            label="Anterior"
            class="q-mr-sm"
          />
          <q-btn
            @click="$refs.stepper.next()"
            color="grey-6"
            :label="step === 3 ? 'Finalizar' : 'Guardar y continuar'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      step: ref(3),
      model: ref("one"),
      secondModel: ref("one"),
      model1: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
};
</script>

<style>
.my-special-class {
  background-color: #1e232d !important;
}

.q-stepper__dot {
  font-size: 14px;
  width: 24px;
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  background: currentColor;
}
.q-stepper__dot span {
  font-size: 2em;
}

/* Color de la linea del stepper */
.q-stepper--horizontal .q-stepper__line:before,
.q-stepper--horizontal .q-stepper__line:after {
  background: #333d50 !important;
}

/* Estilos muy especificos para check */
.q-btn-group--push > .q-btn--push.q-btn--actionable {
  padding-left: 5px;
  border-radius: 2px;
  border: none;
  box-shadow: none;
  padding: 25px;
  width: 250px;
  flex-grow: 0;
}
</style>