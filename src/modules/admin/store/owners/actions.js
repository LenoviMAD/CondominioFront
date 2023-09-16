import authApi from "src/api/api";

export async function getTowerCredential({ commit }, id) {
        try {
                const { data } = await authApi.get(`getTowerCredential/${id}`);
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
}

export const registerUserTower = async ({ commit }, owner) => {
        try {
                const apartments = owner;
                const { data } = await authApi.post("registerUserTower", {
                        apartments,
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
                        return { ok: false, message: "La API no esta activa" };
                }
        }
};
