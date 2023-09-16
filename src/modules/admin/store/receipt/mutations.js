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

export function addItem(state, { idVoucher, item, bs, usd, billAliquot }) {
        const payload = {
                idVoucher,
                item,
                bs,
                usd,
                billAliquot,
        };

        state.items.push(payload);
}

export function addVoucher(
        state,
        {
                address,
                description,
                dateVoucher,
                favorite,
                fileImage,
                idAreaCode,
                idChargesMethods,
                idTypeRif,
                item,
                itemsCurrent,
                nameEnterprise,
                price,
                phone,
                priceUsd,
                referenceNumber,
                rif,
        }
) {
        const payload = {
                address,
                description,
                dateVoucher,
                favorite,
                fileImage,
                idAreaCode,
                idChargesMethods,
                idTypeRif,
                item,
                itemsCurrent,
                nameEnterprise,
                phone,
                price,
                priceUsd,
                referenceNumber,
                rif,
        };

        state.vouchers.push(payload);
}
export function addDivision(
        state,
        {
                item,
                installmentFraction,
                startDate,
                endDate,
                description,
                amountInstallmentBs,
                amountInstallmentUsd,
        }
) {
        const division = {
                item,
                installmentFraction,
                startDate,
                endDate,
                description,
                amountInstallmentBs,
                amountInstallmentUsd,
        };

        state.division.push(division);
}

export function addFavorite(
        state,
        { nameEnterprise, idAreaCode, phone, address, idTypeRif, rif }
) {
        const payload = {
                nameEnterprise,
                idAreaCode,
                phone,
                address,
                idTypeRif,
                rif,
        };

        state.favoriteProvider.push(payload);
}

export function destroyItem(state, payload) {
        state.items = state.items.filter((item) => item.item != payload);
}

export function destroyVoucher(state, payload) {
        state.vouchers = state.vouchers.filter((item) => item.item != payload);
}

export function destroyDivision(state, payload) {
        state.division = state.division.filter((item) => item.item != payload);
}

export function saveEdit(state, payload) {
        state.items = state.items.map((item) =>
                item.item === payload.item ? payload : item
        );
}

export function saveIdVoucher(state, name, payload) {
        state.vouchers.forEach((element) => {
                if (element.item == name) {
                        element.idVoucher = payload;
                }
        });
}

export function emptyVoucher(state) {
        state.vouchers = [];
}

export function emptyDivision(state) {
        state.division = [];
}

export function edit(state, payload) {
        state.currentItem = state.items.find((item) => item.item === payload);
}
