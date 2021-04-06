const orderPeopleManageRouter = {
    path: '/orderPeopleManage',
    name: 'OrderPeopleManage',
    component: () => import('@/views/orderPeopleManage/index.vue'),
    children: [
        {
            path: '/orderPeopleManage/user',
            name: 'OrderPeopleManageUser',
            component: () => import('@/views/orderPeopleManage/user/index.vue')
        },
        {
            path: '/orderPeopleManage/order',
            name: 'OrderPeopleManageOrder',
            component: () => import('@/views/orderPeopleManage/order/index.vue')
        }
    ]
}

export default orderPeopleManageRouter
