<template>
  <q-dialog v-model="modal" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          <div class="text-h6" v-if="!Object.values(currentItem).length">
            Agregar {{ modalLabel }}
          </div>
          <div class="text-h6" v-else>Editar {{ modalLabel }}</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form :class="customClass" @submit.prevent="handleSubmit">
          <slot name="modalIputs"> </slot>
          <div>
            <slot name="modalButtons">
              <q-btn
                :label="
                  !Object.values(currentItem).length ? 'Enviar' : 'Editar'
                "
                type="submit"
                color="primary"
                class="q-mr-sm"
              />
              <q-btn
                label="Salir"
                type="button"
                outline
                color="grey-8"
                @click="closeModal()"
              />
            </slot>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    modalLabel: String,
    customClass: { type: String, default: 'row q-col-gutter-sm'},
    modal: Boolean,
    currentItem: { type: Object, default: {} },
    handleSubmit: Function,
    closeModal: Function,
  },
};
</script>

<style>
</style>