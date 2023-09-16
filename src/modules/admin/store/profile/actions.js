import authApi from "src/api/api";

export async function setItems({ commit }) {
    try {
        const { data } = await authApi.get("getEmployed");

        const listEmployed = data.data;
        if (data.type == "positive") {
            commit("setItems", listEmployed);
        }

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}

export async function addItem({ commit }, user) {
    const {
        email,
        password,
        cpassword,
        idRole,
        name,
        secondName,
        surname,
        secondSurname,
        ci,
        direction,
        birthday,
        phone,
        localphone,
    } = user;
    try {
        const { data } = await authApi.post("register", {
            email,
            password,
            cpassword,
            idRole,
            name,
            secondName,
            surname,
            secondSurname,
            ci,
            direction,
            birthday,
            phone,
            localphone,
        });
        const status = "Activo";
        const { id } = data.data;
        if (data.type == "positive") {
            commit("addItem", {
                id,
                email,
                password,
                cpassword,
                idRole,
                name,
                secondName,
                surname,
                secondSurname,
                ci,
                direction,
                birthday,
                phone,
                localphone,
                status,
            });
        }
        // await authApi.post(":update", {
        //     displayName: name,
        //     idToken,
        //     refreshToken,
        // });

        delete user.password;
        // commit("loginUser", { user, idToken, refreshToken });

        return {
            ok: data.type != "positive" ? false : true,
            message: data.message,
        };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}
export async function destroyItem({ commit, state }, user) {
    //buscamos el id en el estado que tiene el item para asi enviarle los datos a la API
    const { id } = state.items.find((item) => item.id === user);
    // const { status } = "Inactivo";
    try {
        const { data } = await authApi.post("deleteUser", {
            id,
        });
        if (data.type == "positive") {
            commit("destroyItem", data.data);
        }

        return {
            ok: data.type != "positive" ? false : true,
            message: data.message,
        };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}
export function getOne({ commit, state }, id) {}
export function edit({ dispatch }, id) {}

export async function saveEdit({ commit }, user) {
    const {
        id,
        email,
        password,
        cpassword,
        idRole,
        name,
        secondName,
        surname,
        secondSurname,
        ci,
        direction,
        birthday,
        phone,
        localphone,
        status,
    } = user;
    try {
        const { data } = await authApi.put("editUser", {
            id,
            email,
            password,
            cpassword,
            idRole,
            name,
            secondName,
            surname,
            secondSurname,
            ci,
            direction,
            birthday,
            phone,
            status,
            localphone,
        });

        if (data.type == "positive") {
            commit("saveEdit", user);
        }

        delete user.password;

        return {
            ok: data.type != "positive" ? false : true,
            message: data.message,
        };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}

export async function getBanks({ commit }) {
    try {
        const { data } = await authApi.get("getBanks");

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}

export async function saveBank({ commit }, payload) {
    try {
        const { idUser, idBank, bankAccount, banks } = payload;

        const { data } = await authApi.post("bank", {
            idUser,
            idBank,
            bankAccount,
        });

        if (data.type == "positive") {
            const id = data.data.id;
            commit("addItem", {
                id,
                idUser,
                idBank,
                banks,
                bankAccount,
            });
        }

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}

//Para obtener cuentas bancarias de los usuarios
export async function getBank({ commit }, id) {
    try {
        const { data } = await authApi.get(`getBank/${id}`);

        if (data.type == "positive") {
            const listBank = data.data;
            commit("setItems", listBank);
        }

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}
export async function updateBank({ commit }, payload) {
    try {
        const { id, idUser, idBank, bankAccount } = payload;
        const { data } = await authApi.put("updateBank", {
            id,
            idUser,
            idBank,
            bankAccount,
        });

        if (data.type == "positive") {
            commit("saveEdit", payload);
        }

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}
export async function deleteBank({ commit }, id) {
    try {
        const { data } = await authApi.delete(`deleteBank/${id}`);

        if (data.type == "positive") {
            commit("destroyItem", id);
        }

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}

export async function updatePerson({ commit }, payload) {
    try {
        const {
            id,
            name,
            secondName,
            surname,
            secondSurname,
            birthday,
            phone,
            localphone,
            direction,
            address,
            ci,
        } = payload;

        const { data } = await authApi.put("editUser", {
            id,
            name,
            secondName,
            surname,
            secondSurname,
            birthday,
            phone,
            localphone,
            direction,
            address,
            ci,
        });

        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}

export async function getUser({ commit }, id) {
    try {
        const { data } = await authApi.get(`getUser/${id}`);
        return { ok: data.type != "positive" ? false : true, message: data };
    } catch (error) {
        if (error.message != "Network Error") {
            return { ok: false, message: error.message };
        } else {
            return { ok: false, message: "La API no esta activa" };
        }
    }
}
