export function setItems(state, payload) {
        state.items = payload;
}

export function setCurrentItem(state, payload) {
        state.currentItem = payload;
}

// Cambiando el loader del table
export function setLoading(state) {
        state.loading = !state.loading;
}

export function destroyItem(state, payload) {
        state.items = state.items.filter((item) => item.id != payload);
}

export function saveEdit(state, payload) {
        state.items = state.items.map((item) =>
                item.id === payload.id ? payload : item
        );
}

export function edit(state, payload) {
        state.currentItem = state.items.find((item) => item.id === payload);
}
