const userRouter = [
    {
        path: '/user/userInfo',
        name: 'UserInfo',
        component: () => import('@/views/userInfo/index.vue')
    },
    {
        path: '/user/userInfo/code',
        name: 'Code',
        component: () => import('@/views/userInfo/Code/index.vue')
    },
    {
        path: '/user/userInfo/addressList',
        name: 'AddressList',
        component: () => import('@/views/userInfo/addressList/index.vue')
    },
    {
        path: '/user/userInfo/editAddress',
        name: 'EditAddress',
        component: () => import('@/views/userInfo/editAddress/index.vue')
    },
]

export default userRouter
