import authApi from "src/api/api";

export const createUser = async ({ commit }, admin) => {};

export const getDataTower = async ({ commit }, admin) => {
        try {
                const idUser = admin;

                const { data } = await authApi.get("getNumberTower/" + idUser);

                console.log(data, "data");

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
export const getAliquotDifferent = async ({ commit }, admin) => {
        try {
                const idResidential = admin;

                const { data } = await authApi.get(
                        "getAliquotDifferent/" + idResidential
                );

                console.log(data, "data");

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

export const getApartmentAliquot = async ({ commit }, admin) => {
        try {
                const idResidential = admin;

                const { data } = await authApi.get(
                        "getApartmentAliquot/" + idResidential
                );

                console.log(data, "data");

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

export async function getConfigPay({ commit }, id) {
        try {
                const { data } = await authApi.get(`getConfigPay/${id}`);
                console.log(data);
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

export const saveTower = async ({ commit }, admin) => {
        try {
                const tower = admin;
                const { data } = await authApi.post("tower", {
                        tower,
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

export const updateTower = async ({ commit }, admin) => {
        try {
                const tower = admin;
                const { data } = await authApi.put("upTower", {
                        tower,
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

export const saveApartment = async ({ commit }, admin) => {
        try {
                const tower = admin;
                const { data } = await authApi.post("apartment", {
                        tower,
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

export const updateApartment = async ({ commit }, admin) => {
        try {
                const tower = admin;
                const { data } = await authApi.put("upApartment", {
                        tower,
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

export async function getApartmentByIdResidential({ commit }, id) {
        try {
                const { data } = await authApi.get(
                        `getApartmentByIdResidential/${id}`
                );
                console.log(data);
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

export const getBanks = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getBanks");

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

export const saveConfigPay = async ({ commit }, admin) => {
        try {
                const {
                        idResidential,
                        payDay,
                        publishDay,
                        delinquencyAllowed,
                        indicator,
                        penaltyPercent,
                        certificate,
                } = admin;

                let InstFormData = new FormData();
                InstFormData.append("idResidential", idResidential);
                InstFormData.append("payDay", payDay);
                InstFormData.append("publishDay", publishDay);
                InstFormData.append("delinquencyAllowed", delinquencyAllowed);
                InstFormData.append("indicator", indicator);
                InstFormData.append("penaltyPercent", penaltyPercent);
                InstFormData.append("certificate", certificate);

                const { data } = await authApi.post("configPay", InstFormData, {
                        headers: { "content-type": "multipart/form-data" },
                });
                console.log(data, "respuesta de bd");
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
