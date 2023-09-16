import authApi from "src/api/api";

// export const myAction = async ({ commit }) => {

// }

export const savePayment = async ({ commit }, user) => {
        const {
                idPaymentRecord,
                idPaymentMethod,
                idBank,
                paymentInstrument,
                titular,
                ci,
                receiptDetail,
                nReference,
                paidDay,
                amountPaidBs,
                amountPaidUsd,
        } = user;

        try {
                const { data } = await authApi.post("savePayment", {
                        idPaymentRecord,
                        idPaymentMethod,
                        idBank,
                        paymentInstrument,
                        titular,
                        ci,
                        receiptDetail,
                        nReference,
                        paidDay,
                        amountPaidBs,
                        amountPaidUsd,
                });

                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return {
                                ok: false,
                                message: "Problemas de conexión con el servidor intentar mas tarde",
                        };
                }
        }
};

export async function getPaymentByIdApartment({ commit }, id) {
        try {
                const { data } = await authApi.get(
                        `getPaymentByIdApartment/${id}`
                );

                if (data.type == "negative" || data.type == "warning") {
                        return { ok: false, message: data };
                } else {
                        commit("setIdResidential", data.data.id);
                        return { ok: true, message: data };
                }
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}
