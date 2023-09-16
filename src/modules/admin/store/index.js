import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import profile from "./profile";
import owners from "./owners";
import receipt from "./receipt";

export default {
        namespaced: true,
        getters,
        mutations,
        actions,
        state,
        modules: {
                profile,
                owners,
                receipt,
        },
};
