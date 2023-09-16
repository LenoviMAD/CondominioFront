import authApi from "src/api/api";

export async function getResidentialById({ commit }, id) {
        try {
                const { data } = await authApi.get(`getResidentialById/${id}`);
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}

export async function getReceiptByIdResidential({ commit }, id) {
        try {
                const { data } = await authApi.get(
                        `getReceiptByIdResidential/${id}`
                );
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}

export async function getDefaultersByIdResidential({ commit }, id) {
        try {
                const { data } = await authApi.get(
                        `getDefaultersByIdResidential/${id}`
                );
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}

export async function getTowerApartmentByIdResdential({ commit }, id) {
        try {
                const { data } = await authApi.get(
                        `getTowerApartmentByIdResdential/${id}`
                );
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}

export async function getNumberReceipt({ commit }) {
        try {
                const { data } = await authApi.get(`getNumberReceipt`);
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}

export async function saveImageVoucher({ commit }, payload) {
        try {
                const { idVoucher, fileImage } = payload;
                let InstFormData = new FormData();
                InstFormData.append("idVoucher", idVoucher);
                InstFormData.append("fileImage", fileImage);
                console.log(InstFormData, "data enviada");

                const { data } = await authApi.post(
                        "saveImageVoucher",
                        InstFormData,
                        {
                                headers: {
                                        "content-type": "multipart/form-data",
                                },
                        }
                );

                if (data.type == "positive") {
                        commit("emptyVoucher");
                }
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}

export async function saveReceipt({ commit }, payload) {
        try {
                const {
                        idResidential,
                        nroReceipt,
                        date,
                        address,
                        total,
                        totalUSD,
                        receiptDetail,
                        vouchers,
                        division,
                        status,
                } = payload;
                let InstFormData = new FormData();
                InstFormData.append("idResidential", idResidential);
                InstFormData.append("nroReceipt", nroReceipt);
                InstFormData.append("date", date);
                InstFormData.append("address", address);
                InstFormData.append("total", total);
                InstFormData.append("totalUSD", totalUSD);
                InstFormData.append(
                        "receiptDetail",
                        JSON.stringify(receiptDetail)
                );
                InstFormData.append("vouchers", JSON.stringify(vouchers));
                InstFormData.append("division", division);
                InstFormData.append("status", status);
                console.log(InstFormData, "data enviada");
                const { data } = await authApi.post(
                        "saveReceipt",
                        InstFormData,
                        {
                                headers: {
                                        "content-type": "multipart/form-data",
                                },
                        }
                );

                if (data.type == "positive") {
                        commit("emptyDivision");
                }
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
        } catch (error) {
                if (error.message != "Network Error") {
                        return { ok: false, message: error.message };
                } else {
                        return { ok: false, message: "La API no esta activa" };
                }
        }
}
