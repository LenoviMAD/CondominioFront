<template>
  <q-layout view="hhh lpR fff">
    <q-header class="container" style="background-color: #1e232d">
      <q-tabs class="text-white" style="background-color: #1e232d" align="left">
        <q-toolbar class="row justify-between">
          <img class="logo q-py-sm" src="~assets/iconoKatta.png" />
        </q-toolbar>
        <q-route-tab exact :to="{ name: 'home' }" label="Inicio" />
        <q-route-tab
          exact
          @click="(e) => scrollInto('about')"
          label="Quienes somos"
        />
        <q-route-tab
          exact
          @click="(e) => scrollInto('planes')"
          label="Planes"
        />
        <!-- <q-route-tab exact to="/admin" label="Admin" /> -->
        <q-route-tab exact :to="{ name: 'login' }" label="Iniciar sesión" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer
      class="container text-white q-mt-xl"
      style="background-color: #1e232d"
    >
      <q-separator />
      <div class="column items-center q-py-md">
        <div class="col text-center">
          <p class="q-mb-none">
            Copyright © 2020 <strong>SenCondominio</strong>. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { scrollInto } from "../helpers";

export default {
  setup() {
    return { scrollInto };
  },
};
</script>


<style lang="sass" scoped>
.body--light
  background-color: #ffffff
.azul-lighter
  background-color: #e8f8f7
.green-lighter
  background-color: #f6f3e3
.brown-lighter
  background-color: #f3e4dc
.logo
  max-width: 100px
.wrapc
  flex-wrap: wrap
</style>