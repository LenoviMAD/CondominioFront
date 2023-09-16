import authApi from "src/api/api";
import dollarApi from "src/api/apiDeRepuesto";

export function someAction(/* context */) {}

export const confirmPay = async ({ commit }, user) => {
        const { email } = user;

        try {
                const { data } = await authApi.post("generateAuth", {
                        email,
                });

                // commit("confirmPay", { user });

                return { ok: true, message: data };
        } catch (error) {
                return {
                        ok: false,
                        message: error.message,
                };
        }
};

export const getPlan = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getPlans");
                console.log(data.data, "hola");

                commit("setPlan", data.data);
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getTimePlan = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getTimePlan");

                commit("setTimePlan", data.data);
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getPhoneAreaCod = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getPhoneAreaCod");
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getBankTypeAccount = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getBankTypeAccount");

                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};
export const getCIType = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getCIType");

                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};
export const getRifType = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getRifType");

                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getValueUSD = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getValueUSD");
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getPaymentMethods = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getPaymentMethods");
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getChargesMethods = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getChargesMethods");
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getBanksDataResidence = async ({ commit }, id) => {
        try {
                const { data } = await authApi.get(
                        `getBanksDataResidence/${id}`
                );
                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};

export const getValueUSDRepuesto = async ({ commit }) => {
        try {
                const { data } = await dollarApi.get("");

                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};
