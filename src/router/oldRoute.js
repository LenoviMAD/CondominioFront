const routes = [{
        path: '/',
        component: () =>
            import ('layouts/LayoutLanding.vue'),
        children: [
            { path: '', component: () =>
                    import ('src/pages/Landing/Home.vue') },
            { path: 'about', component: () =>
                    import ('src/pages/Landing/About.vue') }
        ]
    },
    {
        path: '/',
        component: () =>
            import ('layouts/LayoutAuth.vue'),
        children: [
            { path: 'signin', component: () =>
                    import ('src/pages/Landing/Signin/Signin.vue') },
            { path: 'signup', component: () =>
                    import ('src/pages/Landing/Signup/Signup.vue') },
        ]
    },
    {
        path: '/admin',
        component: () =>
            import ('src/layouts/LayoutAdmin.vue'),
        children: [
            { path: '', component: () =>
                    import ('src/pages/Admin/Dashboard/Dashboard.vue') },
            { path: 'config', component: () =>
                    import ('src/pages/Admin/Config/Config.vue') },
            { path: 'buildings', component: () =>
                    import ('src/pages/Admin/Buildings/Buildings.vue') },
            { path: 'admins', component: () =>
                    import ('src/pages/Admin/Admins/Admins.vue') },
            { path: 'expenses', component: () =>
                    import ('src/pages/Admin/Expenses/Expenses.vue') },
            { path: 'owners', component: () =>
                    import ('src/pages/Admin/Owners/Owners.vue') },
            { path: 'invoices', component: () =>
                    import ('src/pages/Admin/Invoices/Invoices.vue') },
            { path: 'charges', component: () =>
                    import ('src/pages/Admin/Charges/Charges.vue') },
            { path: 'news', component: () =>
                    import ('src/pages/Admin/News/News.vue') },
            { path: 'section-owner', component: () =>
                    import ('src/pages/Admin/SectionOwner/SectionOwner.vue') },
            { path: 'section-owner/payment-history', component: () =>
                    import ('src/pages/Admin/SectionOwner/PaymentHistory.vue') },
            { path: 'section-owner/receipt-of-collections', component: () =>
                    import ('src/pages/Admin/SectionOwner/ReceiptCollections.vue') },
            { path: 'section-owner/success', component: () =>
                    import ('src/pages/Admin/SectionOwner/Success.vue') },
        ]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes