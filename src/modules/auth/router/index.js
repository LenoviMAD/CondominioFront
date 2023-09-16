export default {
        name: "auth",
        component: () =>
                import(
                        /* webpackChunkName: "Auth Layout" */ "src/modules/auth/layouts/LayoutAuth.vue"
                ),
        children: [
                {
                        path: "",
                        name: "login",
                        component: () =>
                                import(
                                        /* webpackChunkName: "Login" */ "src/modules/auth/pages/Signin.vue"
                                ),
                },
                {
                        path: "register",
                        name: "register",
                        component: () =>
                                import(
                                        /* webpackChunkName: "Register" */ "src/modules/auth/pages/Signup.vue"
                                ),
                },
                {
                        path: "changePassword",
                        name: "changePassword",
                        component: () =>
                                import(
                                        /* webpackChunkName: "Register" */ "src/modules/auth/pages/ChangePassword.vue"
                                ),
                },
                {
                        path: "plans",
                        name: "plans",
                        component: () =>
                                import(
                                        /* webpackChunkName: "Register" */ "src/modules/auth/pages/Plans.vue"
                                ),
                },
                {
                        path: "confirmPlan",
                        name: "confirmPlan",
                        component: () =>
                                import(
                                        /* webpackChunkName: "Register" */ "src/modules/auth/pages/ConfirmPlan.vue"
                                ),
                },
        ],
};
