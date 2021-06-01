const orderPeopleManageRouter = {
    path: '/orderPeopleManage',
    name: 'OrderPeopleManage',
    component: () => import('@/views/orderPeopleManage/index.vue'),
    children: [
        {
            path: '/orderPeopleManage/user',
            name: 'OrderPeopleManageUser',
            component: () => import('@/views/orderPeopleManage/user/index.vue'),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/orderPeopleManage/order',
            name: 'OrderPeopleManageOrder',
            component: () => import('@/views/orderPeopleManage/order/index.vue'),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        }
    ]
}

export default orderPeopleManageRouter
