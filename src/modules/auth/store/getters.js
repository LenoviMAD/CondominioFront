export const currentState = (state) => {
        return state.status;
};

export const username = (state) => {
        return state.name || "";
};

export function getCurrentResidential(state) {
        return state.currentResidential;
}
