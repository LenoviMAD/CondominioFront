import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
        const store = useStore();

        const confirmPay = async (user) => {
                const resp = await store.dispatch("auth/generateAuth", user);
                return resp;
        };

        const createUser = async (user) => {
                const resp = await store.dispatch("auth/createUser", user);
                return resp;
        };

        const loginUser = async (user) => {
                const resp = await store.dispatch("auth/signInUser", user);
                return resp;
        };

        const changePassword = async (user) => {
                const resp = await store.dispatch("auth/changePassword", user);
                return resp;
        };

        const getPerfilData = async (user) => {
                const resp = await store.dispatch("auth/getPerfilData", user);
                return resp;
        };

        const checkAuthStatus = async () => {
                const resp = await store.dispatch("auth/checkAuthentication");
                return resp;
        };

        const getTypeDocument = async () => {
                const resp = await store.dispatch("auth/getTypeDocument");
                return resp;
        };
        const getBanks = async () => {
                const resp = await store.dispatch("auth/getBanks");
                return resp;
        };

        const logout = () => {
                store.commit("auth/logout");
        };

        const passwordValidate = (password) => {
                var message = "";
                var regexUpper = /[A-Z]/;
                var regexLower = /[a-z]/;
                var regexSpecial = /[$@$!#.%*?&]/;
                var regexDigit = /[0-9]/;

                var OK = regexUpper.exec(password);

                if (!OK) {
                        message = "<br>- Falta caracter en Mayúsculas.";
                }

                OK = regexLower.exec(password);

                if (!OK) {
                        message =
                                message + "<br>- Falta caracter en Minúsculas.";
                }

                OK = regexSpecial.exec(password);
                if (!OK) {
                        message = message + "<br>- Falta caracter Especial.";
                }

                OK = regexDigit.exec(password);

                if (!OK) {
                        message = message + "<br>- Falta caracter Númerico.";
                }
                return message;
        };

        const getIdResidential = async (id) => {
                console.log("admin", id);
                const resp = await store.dispatch("auth/getIdResidential", id);
                return resp;
        };

        return {
                passwordValidate,
                confirmPay,
                checkAuthStatus,
                createUser,
                loginUser,
                logout,
                changePassword,
                getTypeDocument,
                getBanks,
                getIdResidential,
                getPerfilData,
                authStatus: computed(() => store.getters["auth/currentState"]),
                username: computed(() => store.getters["auth/username"]),
        };
};

export default useAuth;
