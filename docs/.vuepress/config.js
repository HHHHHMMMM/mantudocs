module.exports = {
    title: 'MANTU_DOCS',
    description: 'MANTU_TECH_DOCS',
    dest: './dist',
    port: '8888',
    head: [
        ['link', {rel: 'icon', href: '/logo.jpg'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require("./nav.js"),
        sidebar: require("./sidebar"),
        //sidebar: 'auto',
        sidebarDepth: 4,
        lastUpdated: 'Last Updated',
        logo: '/logo.jpg',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },
    plugins: [
        '@vuepress/register-components',
        {
            componentsDir:  './components'
        }
    ]

}
