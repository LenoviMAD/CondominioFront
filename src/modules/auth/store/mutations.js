//export const loginUser = (state, { user, token, refreshToken, role }) => {
export const loginUser = (
        state,
        { id, email, name, token, role, residential }
) => {
        if (token) {
                localStorage.setItem("token", token);

                state.token = token;
        }

        // if (refreshToken) {
        //         localStorage.setItem("refreshToken", refreshToken);
        //         state.refreshToken = refreshToken;
        // }

        state.id = id;
        state.email = email;
        state.name = name;
        state.role = role;
        // state.user = user;
        state.status = "authenticated";

        state.residential = residential;

        state.currentResidential = residential[0];
};

export const logout = (state) => {
        state.token = null;
        state.role = null;
        state.refreshToken = null;
        state.id = null;
        state.email = null;
        state.name = null;
        state.status = "not-authenticated";
        state.residential = [];
        state.currentResidential = {};

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
};

export function setIdResidential(state, payload) {
        state.idResidential = payload;
}

export function setResidential(state, payload) {
        state.residential = payload;
}

export function setCurrentResidential(state, payload) {
        state.currentResidential = state.residential.find(
                (item) => item.idResidential === payload
        );
}

//Falta adaptar a lo que se necesite
export function destroyItem(state, payload) {
        state.items = state.items.filter((item) => item.id != payload);
}

export function destroyItemId(state, payload) {
        state.items = state.items.filter((item) => item.id != payload);
}

export function saveEdit(state, payload) {
        state.items = state.items.map((item) =>
                item.id === payload.id ? payload : item
        );
}
