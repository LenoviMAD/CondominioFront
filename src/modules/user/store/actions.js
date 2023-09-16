import authApi from "src/api/api";

// export const myAction = async ({ commit }) => {

// }

export const savePerfil = async ({ commit }, user) => {
        try {
                const {
                        idUser,
                        name,
                        surname,
                        secondName,
                        secondSurname,
                        email,
                        ci,
                        phones,
                        birthday,
                        banks,
                        bankAccount,
                        documentProperty,
                        idApartment,
                } = user;

                const idTypeCi = user.idTypeCi.id;
                const idTypeEntity = 129;
                let InstFormData = new FormData();
                InstFormData.append("idUser", idUser);
                InstFormData.append("name", name);
                InstFormData.append("secondName", secondName);
                InstFormData.append("surname", surname);
                InstFormData.append("secondSurname", secondSurname);
                InstFormData.append("email", email);
                InstFormData.append("idTypeCi", idTypeCi);
                InstFormData.append("ci", ci);
                InstFormData.append("phones", JSON.stringify(phones));
                InstFormData.append("idApartment", idApartment);
                InstFormData.append("birthday", birthday);
                InstFormData.append("documentProperty", documentProperty);
                InstFormData.append("idTypeEntity", idTypeEntity);

                const { data } = await authApi.post(
                        "savePerfil",
                        InstFormData,
                        {
                                headers: {
                                        "content-type": "multipart/form-data",
                                },
                        }
                );
                // const { data } = await authApi.post("savePerfil", {
                //         idUser,
                //         name,
                //         surname,
                //         secondName,
                //         secondSurname,
                //         email,
                //         idTypeCi,
                //         ci,
                //         address,
                //         phones,
                //         birthday,
                //         banks,
                //         bankAccount,
                //         documentProperty,
                // });

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

export async function getPerfilData({ commit }, id) {
        try {
                const { data } = await authApi.get(`getPerfilData/${id}`);
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

export async function getOwnerDocument({ commit }, id) {
        try {
                const { data } = await authApi.get(`getOwnerDocument/${id}`);
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

export async function getReceiptByIdUser({ commit }, id) {
        try {
                const { data } = await authApi.get(`getReceiptByIdUser/${id}`);
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
