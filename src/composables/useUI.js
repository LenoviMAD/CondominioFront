import { computed } from "vue";
import { useStore } from "vuex";

const useUI = () => {
        const store = useStore();

        const confirmPay = async (user) => {
                const resp = await store.dispatch("ui/confirmPay", user);
                return resp;
        };

        const filterKey = (type, e) => {
                switch (type) {
                        case "entero":
                                if (
                                        (e.keyCode < 48 || e.keyCode > 57) &&
                                        e.keyCode != 8 &&
                                        (e.keyCode < 96 || e.keyCode > 105)
                                ) {
                                        // No se agrega
                                        e.preventDefault();
                                }
                                break;
                        case "decimal":
                                if (
                                        (e.keyCode < 48 || e.keyCode > 57) &&
                                        e.keyCode != 8 &&
                                        e.keyCode != 190 &&
                                        e.keyCode != 110 &&
                                        (e.keyCode < 96 || e.keyCode > 105)
                                ) {
                                        // No se agrega
                                        e.preventDefault();
                                }
                                break;

                        default:
                                break;
                }
                // Si el código es menor que 48 (0) o mayor que 57 (9)
        };

        const getPlan = async (user) => {
                const resp = await store.dispatch("ui/getPlan", user);
                return resp;
        };
        const getTimePlan = async (user) => {
                const resp = await store.dispatch("ui/getTimePlan", user);
                return resp;
        };

        const getPhoneAreaCod = async (user) => {
                const resp = await store.dispatch("ui/getPhoneAreaCod", user);
                return resp;
        };
        const getBankTypeAccount = async (user) => {
                const resp = await store.dispatch(
                        "ui/getBankTypeAccount",
                        user
                );
                return resp;
        };
        const getCIType = async (user) => {
                const resp = await store.dispatch("ui/getCIType", user);
                return resp;
        };
        const getRifType = async (user) => {
                const resp = await store.dispatch("ui/getRifType", user);
                return resp;
        };
        const getPaymentMethods = async (user) => {
                const resp = await store.dispatch("ui/getPaymentMethods", user);
                return resp;
        };

        const getChargesMethods = async (user) => {
                const resp = await store.dispatch("ui/getChargesMethods", user);
                return resp;
        };
        const getValueUSD = async (user) => {
                const resp = await store.dispatch("ui/getValueUSD", user);
                return resp;
        };
        const getValueUSDRepuesto = async (user) => {
                const resp = await store.dispatch(
                        "ui/getValueUSDRepuesto",
                        user
                );
                return resp;
        };
        const getBanksDataResidence = async (idResidence) => {
                const resp = await store.dispatch(
                        "ui/getBanksDataResidence",
                        idResidence
                );
                return resp;
        };

        const firstCero = (string, e) => {
                if (
                        string.length == 0 &&
                        (e.keyCode == 48 || e.keyCode == 96)
                ) {
                        e.preventDefault();
                }
        };

        return {
                // Modal Options
                modalOpen: computed(() => store.getters["ui/isModalOpen"]),
                toggleModal() {
                        store.commit("ui/toggleModal");
                },
                confirmPay,
                filterKey,
                firstCero,
                getPlan,
                getTimePlan,
                getPhoneAreaCod,
                getBankTypeAccount,
                getCIType,
                getRifType,
                getValueUSD,
                getPaymentMethods,
                getChargesMethods,
                getBanksDataResidence,
                getValueUSDRepuesto,
        };
};

export default useUI;
