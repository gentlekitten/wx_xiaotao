const mySiteManageRouter = {
    path: '/mySiteManage',
    name: 'MySiteManage',
    component: () => import('@/views/mySiteManage/index.vue'),
    children: [
        {
            path: '/mySiteManage/user',
            name: 'MySiteManageUser',
            component: () => import('@/views/mySiteManage/user/index.vue')
        },
        {
            path: '/mySiteManage/order',
            name: 'MySiteManageGoods',
            component: () => import('@/views/mySiteManage/order/index.vue')
        }
    ]
}

export default mySiteManageRouter
