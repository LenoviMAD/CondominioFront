import { createRouter, createWebHashHistory } from "vue-router";
import authRouter from "../modules/auth/router";
import adminRouter from "../modules/admin/router";
import userRouter from "../modules/user/router";

const routes = [
        {
                path: "/",
                name: "landing",
                component: () =>
                        import(
                                /* webpackChunkName: "Landing Layout" */ "layouts/LayoutLanding.vue"
                        ),
                children: [
                        {
                                path: "",
                                name: "home",
                                component: () =>
                                        import(
                                                /* webpackChunkName: "about" */ "../pages/Landing/Home.vue"
                                        ),
                        },
                ],
        },
        {
                path: "/auth/",
                ...authRouter,
        },
        {
                path: "/admin",
                ...adminRouter,
        },
        {
                path: "/user",
                ...userRouter,
        },
        // {
        //   path: '/admin',
        //   component: () =>
        //       import ('src/layouts/LayoutAdmin.vue'),
        //   children: [
        //       { path: '', component: () =>
        //               import ('src/pages/Admin/Dashboard/Dashboard.vue') },
        //       { path: 'config', component: () =>
        //               import ('src/pages/Admin/Config/Config.vue') },
        //       { path: 'buildings', component: () =>
        //               import ('src/pages/Admin/Buildings/Buildings.vue') },
        //       { path: 'admins', component: () =>
        //               import ('src/pages/Admin/Admins/Admins.vue') },
        //       { path: 'expenses', component: () =>
        //               import ('src/pages/Admin/Expenses/Expenses.vue') },
        //       { path: 'owners', component: () =>
        //               import ('src/pages/Admin/Owners/Owners.vue') },
        //       { path: 'invoices', component: () =>
        //               import ('src/pages/Admin/Invoices/Invoices.vue') },
        //       { path: 'charges', component: () =>
        //               import ('src/pages/Admin/Charges/Charges.vue') },
        //       { path: 'news', component: () =>
        //               import ('src/pages/Admin/News/News.vue') },
        //       { path: 'section-owner', component: () =>
        //               import ('src/pages/Admin/SectionOwner/SectionOwner.vue') },
        //       { path: 'section-owner/payment-history', component: () =>
        //               import ('src/pages/Admin/SectionOwner/PaymentHistory.vue') },
        //       { path: 'section-owner/receipt-of-collections', component: () =>
        //               import ('src/pages/Admin/SectionOwner/ReceiptCollections.vue') },
        //       { path: 'section-owner/success', component: () =>
        //               import ('src/pages/Admin/SectionOwner/Success.vue') },
        //   ]
        // },
        // Always leave this as last one,
        // but you can also remove it
        {
                path: "/:catchAll(.*)*",
                component: () => import("pages/Error404.vue"),
        },
];

const router = createRouter({
        history: createWebHashHistory(),
        routes,
});

export default router;
