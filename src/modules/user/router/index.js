export default {
        component: () => import("src/modules/user/layouts/LayoutUser.vue"),
        children: [
                {
                        path: "",
                        name: "dashboardUser",
                        component: () =>
                                import(
                                        "src/modules/user/pages/Dashboard/Dashboard.vue"
                                ),
                },
                {
                        path: "profile",
                        name: "profileUser",
                        component: () =>
                                import(
                                        "src/modules/user/pages/Profile/Profile.vue"
                                ),
                },
                {
                        path: "paymentsTable",
                        name: "PaymentsTableClient",
                        component: () =>
                                import(
                                        "src/modules/user/pages/Payments/PaymentsClient.vue"
                                ),
                },
                {
                        path: "paymentsRecord",
                        name: "PaymentsRecordClient",
                        component: () =>
                                import(
                                        "src/modules/user/pages/Payments/components/PaymentRegister.vue"
                                ),
                },
        ],
};
