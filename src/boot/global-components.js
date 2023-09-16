const globalComponents = {
        senTable: require("components/~Global/SenTable/SenTable").default,
        senTableGrid: require("components/~Global/SenTableGrid/SenTableGrid")
                .default,
        senTableWithAction:
                require("components/~Global/SenTableWithAction/SenTableWithAction")
                        .default,
        senModalForm: require("components/~Global/SenModalForm/SenModalForm")
                .default,
        senMenuLinks: require("components/~Global/SenMenuLinks/SenMenuLinks")
                .default,
        senBreadcrumbs:
                require("components/~Global/SenBreadcrumbs/SenBreadcrumbs")
                        .default,
        senBtnDropdown:
                require("components/~Global/SenBtnDropdown/SenBtnDropdown")
                        .default,
        senCardIcons: require("components/~Global/SenCardIcons/SenCardIcons")
                .default,
};

export default async ({ app }) => {
        Object.entries(globalComponents).forEach(([name, component]) => {
                app.component(name, component);
        });
};
