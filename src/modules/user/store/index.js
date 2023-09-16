import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import payments from "./payments";

export default {
        namespaced: true,
        getters,
        mutations,
        actions,
        state,
        modules: {
                payments,
        },
};
