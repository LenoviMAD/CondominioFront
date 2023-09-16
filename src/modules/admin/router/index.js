export default {
        component: () => import("src/modules/admin/layouts/LayoutAdmin.vue"),
        children: [
                {
                        path: "",
                        name: "dashboardAdmin",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Dashboard/Dashboard.vue"
                                ),
                },
                {
                        path: "config",
                        name: "configAdmin",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Config/Config.vue"
                                ),
                },
                {
                        path: "buildings",
                        name: "buildings",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Buildings/Buildings.vue"
                                ),
                },
                {
                        path: "admins",
                        name: "admins",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Admins/Admins.vue"
                                ),
                },
                {
                        path: "expenses",
                        name: "expenses",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Expenses/Expenses.vue"
                                ),
                },
                {
                        path: "owners",
                        name: "owners",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Owners/Owners.vue"
                                ),
                },
                {
                        path: "invoices",
                        name: "invoices",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Invoices/Invoices.vue"
                                ),
                },
                {
                        path: "charges",
                        name: "charges",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Charges/Charges.vue"
                                ),
                },
                {
                        path: "news",
                        name: "news",
                        component: () =>
                                import("src/modules/admin/pages/News/News.vue"),
                },
                {
                        path: "sectionOwner",
                        name: "sectionOwner",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/SectionOwner/SectionOwner.vue"
                                ),
                },
                {
                        path: "sectionOwner/paymentHistory",
                        name: "paymentHistory",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/SectionOwner/PaymentHistory.vue"
                                ),
                },
                {
                        path: "sectionOwner/receiptCollections",
                        name: "receiptCollections",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/SectionOwner/ReceiptCollections.vue"
                                ),
                },
                {
                        path: "sectionOwner/success",
                        name: "success",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/SectionOwner/Success.vue"
                                ),
                },
                {
                        path: "tower",
                        name: "tower",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Towers/Tower.vue"
                                ),
                },
                {
                        path: "receipt",
                        name: "receipt",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Receipt/Receipt.vue"
                                ),
                },
                {
                        path: "receiptCreate",
                        name: "receiptCreate",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Receipt/components/CreateReceipt.vue"
                                ),
                },
                {
                        path: "paymentsAdmin",
                        name: "paymentsAdmin",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Payments/PaymentsClient.vue"
                                ),
                },
                {
                        path: "defaulters",
                        name: "defaulters",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Defaulters/Defaulters.vue"
                                ),
                },
                {
                        path: "profile",
                        name: "profile",
                        component: () =>
                                import(
                                        "src/modules/admin/pages/Profile/Profile.vue"
                                ),
                },
        ],
};
