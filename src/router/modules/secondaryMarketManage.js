const secondaryMarketManageRouter = {
    path: '/secondaryMarketManage',
    name: 'SecondaryMarketManage',
    component: () => import('@/views/secondaryMarketManage/index.vue'),
    children: [
        {
            path: '/secondaryMarketManage/user',
            name: 'secondaryMarketManageUser',
            component: () => import('@/views/secondaryMarketManage/user/index.vue')
        },
        {
            path: '/secondaryMarketManage/order',
            name: 'secondaryMarketManageOrder',
            component: () => import('@/views/secondaryMarketManage/order/index.vue')
        }
    ]
}

export default secondaryMarketManageRouter
