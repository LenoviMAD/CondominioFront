import { computed } from "vue";
import { useStore } from "vuex";

const useUser = () => {
        const store = useStore();

        const savePerfil = async (user) => {
                const resp = await store.dispatch("user/savePerfil", user);
                return resp;
        };

        const getPerfilData = async (user) => {
                const resp = await store.dispatch("user/getPerfilData", user);
                return resp;
        };

        const getOwnerDocument = async (user) => {
                const resp = await store.dispatch(
                        "user/getOwnerDocument",
                        user
                );
                return resp;
        };

        const getReceiptByIdUser = async (user) => {
                const resp = await store.dispatch(
                        "user/getReceiptByIdUser",
                        user
                );
                return resp;
        };
        const savePayment = async (user) => {
                const resp = await store.dispatch(
                        "user/payments/savePayment",
                        user
                );
                return resp;
        };
        const getPaymentByIdApartment = async (idApartment) => {
                const resp = await store.dispatch(
                        "user/payments/getPaymentByIdApartment",
                        idApartment
                );
                return resp;
        };

        return {
                savePerfil,
                getPerfilData,
                getOwnerDocument,
                getReceiptByIdUser,
                savePayment,
                getPaymentByIdApartment,
        };
};

export default useUser;
