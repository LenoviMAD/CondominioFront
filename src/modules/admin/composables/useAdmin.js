import { useStore } from "vuex";

const useAdmin = () => {
        const store = useStore();

        const getDataTower = async (admin) => {
                const resp = await store.dispatch("admin/getDataTower", admin);
                return resp;
        };

        const saveTower = async (admin) => {
                const resp = await store.dispatch("admin/saveTower", admin);
                return resp;
        };

        const updateTower = async (admin) => {
                const resp = await store.dispatch("admin/updateTower", admin);
                return resp;
        };

        const saveApartment = async (admin) => {
                const resp = await store.dispatch("admin/saveApartment", admin);
                return resp;
        };

        const getConfigPay = async (admin) => {
                const resp = await store.dispatch("admin/getConfigPay", admin);
                return resp;
        };

        const updateApartment = async (admin) => {
                const resp = await store.dispatch(
                        "admin/updateApartment",
                        admin
                );
                return resp;
        };

        const saveConfigPay = async (admin) => {
                const resp = await store.dispatch("admin/saveConfigPay", admin);
                return resp;
        };

        const getTowerCredential = async (owners) => {
                const resp = await store.dispatch(
                        "admin/owners/getTowerCredential",
                        owners
                );
                return resp;
        };
        const registerUserTower = async (owners) => {
                const resp = await store.dispatch(
                        "admin/owners/registerUserTower",
                        owners
                );
                return resp;
        };

        const getAliquotDifferent = async (admin) => {
                const resp = await store.dispatch(
                        "admin/getAliquotDifferent",
                        admin
                );
                return resp;
        };

        const getApartmentAliquot = async (admin) => {
                const resp = await store.dispatch(
                        "admin/getApartmentAliquot",
                        admin
                );
                return resp;
        };

        const getResidentialById = async (admin) => {
                const resp = await store.dispatch(
                        "admin/receipt/getResidentialById",
                        admin
                );
                return resp;
        };

        const getNumberReceipt = async () => {
                const resp = await store.dispatch(
                        "admin/receipt/getNumberReceipt"
                );
                return resp;
        };

        const saveImageVoucher = async (voucher) => {
                const resp = await store.dispatch(
                        "admin/receipt/saveImageVoucher",
                        voucher
                );
                return resp;
        };

        const saveReceipt = async (receipt) => {
                const resp = await store.dispatch(
                        "admin/receipt/saveReceipt",
                        receipt
                );
                return resp;
        };

        const getReceiptByIdResidential = async (receipt) => {
                const resp = await store.dispatch(
                        "admin/receipt/getReceiptByIdResidential",
                        receipt
                );
                return resp;
        };

        const getDefaultersByIdResidential = async (residential) => {
                const resp = await store.dispatch(
                        "admin/receipt/getDefaultersByIdResidential",
                        residential
                );
                return resp;
        };

        const getTowerApartmentByIdResdential = async (residential) => {
                const resp = await store.dispatch(
                        "admin/receipt/getTowerApartmentByIdResdential",
                        residential
                );
                return resp;
        };
        const getApartmentByIdResidential = async (residential) => {
                const resp = await store.dispatch(
                        "admin/getApartmentByIdResidential",
                        residential
                );
                return resp;
        };

        return {
                getDataTower,
                saveApartment,
                updateApartment,
                saveTower,
                updateTower,
                saveConfigPay,
                getTowerCredential,
                registerUserTower,
                getConfigPay,
                getAliquotDifferent,
                getApartmentAliquot,
                getResidentialById,
                saveImageVoucher,
                saveReceipt,
                getNumberReceipt,
                getReceiptByIdResidential,
                getDefaultersByIdResidential,
                getApartmentByIdResidential,
                getTowerApartmentByIdResdential,
        };
};

export default useAdmin;
