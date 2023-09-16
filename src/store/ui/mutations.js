export function someMutation(/* state */) {}

export function toggleModal(state) {
        state.isModalOpen = !state.isModalOpen;
}

export function toggleModalForm(state) {
        console.log(!state.modal);
        state.modal = !state.modal;
}

export function setPlan(state, payload) {
        state.plan = payload;
}

export function setTimePlan(state, payload) {
        state.timePlan = payload;
}

export function setPlanSelect(state, payload) {
        state.planSelect = payload;
}

export function setCurrentItem(state, id) {
        state.currentItem = state.plan.find((element) => (element.id = id));
}
