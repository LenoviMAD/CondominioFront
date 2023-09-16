import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modal: {
            estado: false
        }
    },
    mutations: {
        mostrarModal(state) {
            state.modal.estado = true
        },

        ocultarModal(state) {
            state.modal.estado = false
        }
    },
    actions: {

    }
})