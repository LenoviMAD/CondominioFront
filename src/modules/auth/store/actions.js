import authApi from "src/api/api";

// export const myAction = async ({ commit }) => {

// }

export const createUser = async ({ commit }, user) => {
        const {
                idUser,
                name,
                secondName,
                surname,
                secondSurname,
                ciAdmin,
                address,
                phones,
                rifResidential,
                logo,
                addressResidential,
                phonesResidential,
                email,
                nTowers,
                residentialName,
                typeAdmin,
                //bancos
                bankAccount,
                rifBank,
                idTypeRifBank,
        } = user;

        const idRole = 2;

        const idBank = user.idBank.id;
        const idTypeAccount = user.idTypeAccount.id;
        const idTypeDocumentAdmin = user.idTypeDocumentAdmin.id;
        const idTypeRifResidential = user.idTypeRifResidential.id;

        let InstFormData = new FormData();
        InstFormData.append("idUser", idUser);
        InstFormData.append("name", name);
        InstFormData.append("secondName", secondName);
        InstFormData.append("surname", surname);
        InstFormData.append("secondSurname", secondSurname);
        InstFormData.append("ciAdmin", ciAdmin);
        InstFormData.append("address", address);
        InstFormData.append("phones", JSON.stringify(phones));
        InstFormData.append("rifResidential", rifResidential);
        InstFormData.append("addressResidential", addressResidential);
        InstFormData.append(
                "phonesResidential",
                JSON.stringify(phonesResidential)
        );
        InstFormData.append("logo", logo);
        InstFormData.append("email", email);
        InstFormData.append("nTowers", nTowers);
        InstFormData.append("residentialName", residentialName);
        InstFormData.append("typeAdmin", typeAdmin);
        InstFormData.append("bankAccount", bankAccount);
        InstFormData.append("rifBank", rifBank);
        InstFormData.append("idBank", idBank);
        InstFormData.append("idTypeAccount", idTypeAccount);
        InstFormData.append("idTypeRifBank", idTypeRifBank);
        InstFormData.append("idTypeDocumentAdmin", idTypeDocumentAdmin);
        InstFormData.append("idTypeRifResidential", idTypeRifResidential);
        InstFormData.append("idRole", idRole);
        try {
                const { data } = await authApi.post("register", InstFormData, {
                        headers: { "content-type": "multipart/form-data" },
                });
                commit("setIdResidential", data.data.id);
                const setResidential = [];
                setResidential.push({
                        idResidential: data.data.id,
                        nameResidential: residentialName,
                });
                commit("setResidential", setResidential);
                commit("setCurrentResidential", data.data.id);

                //Tambien se deberia actualizar los estados de las residencias
                return {
                        ok: data.type != "positive" ? false : true,
                        message: data,
                };
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

export const signInUser = async ({ commit }, user) => {
        const { email, password } = user;

        try {
                const { data } = await authApi.post("login", {
                        email,
                        password,
                        returnSecureToken: true,
                });
                const { id, idRole, token, residential } = data.data;

                // const surname =
                //         data.user.surname == null ? "" : data.data.user.surname;
                // const secondName =
                //         data.user.secondName == null
                //                 ? ""
                //                 : data.data.user.secondName;
                // const secondSurname =
                //         data.user.secondSurname == null
                //                 ? ""
                //                 : data.data.user.secondSurname;

                const name = "nombre completo no esta relacionado";
                //         data.user.name +
                //         " " +
                //         secondName +
                //         " " +
                //         surname +
                //         " " +
                //         secondSurname;
                const role = idRole;
                console.log(data);
                if (data.code == 100) {
                        console.log(residential, "state residential");

                        commit("loginUser", {
                                id,
                                email,
                                name,
                                token,
                                role,
                                residential,
                        });
                }

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

export const checkAuthentication = async ({ commit }) => {
        const idToken = localStorage.getItem("idToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!idToken) {
                commit("logout");
                return { ok: false, message: "No hay token" };
        }

        try {
                const { data } = await authApi.post(":lookup", { idToken });
                const { displayName, email } = data.users[0];

                const user = {
                        name: displayName,
                        email,
                };

                commit("loginUser", { user, idToken, refreshToken });

                return { ok: true };
        } catch (error) {
                commit("logout");
                return {
                        ok: false,
                        message: error.response.data.error.message,
                };
        }
};

export const changePassword = async ({ commit }, user) => {
        const { email, password, cpassword } = user;

        try {
                const { data } = await authApi.put("changePassword", {
                        email,
                        password,
                        cpassword,
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
                                message: "P     roblemas de conexión con el servidor intentar mas tarde",
                        };
                }
        }
};

export const generateAuth = async ({ commit }, user) => {
        const {
                email,
                name,
                secondName,
                surname,
                secondSurname,
                phones,
                cedula,
                paymentDate,
                amount,
                idTime,
                idPlan,
                indicator,
                referenceNumber,
                pathArchive,
        } = user;
        const idBank = user.idBank.id;
        const idTypeCI = user.idTypeCI.id;

        try {
                const { data } = await authApi.post("generateAuth", {
                        email,
                        name,
                        secondName,
                        surname,
                        secondSurname,
                        phones,
                        idTypeCI,
                        cedula,
                        paymentDate,
                        amount,
                        idTime,
                        idBank,
                        idPlan,
                        indicator,
                        referenceNumber,
                        pathArchive,
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
                                message: "Problemas de Conexión con el Servidor, por favor intentar mas tarde",
                        };
                }
        }
};

export const getTypeDocument = async ({ commit }) => {
        try {
                const { data } = await authApi.get("getTypeDocument");
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
                        return {
                                ok: false,
                                message: "P     roblemas de conexión con el servidor intentar mas tarde",
                        };
                }
        }
};

export async function getIdResidential({ commit }, id) {
        try {
                const { data } = await authApi.get(`getIdResidential/${id}`);

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
