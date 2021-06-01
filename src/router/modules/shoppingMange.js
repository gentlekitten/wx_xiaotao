const shoppingMangeRouter = {
    path: '/shoppingMange',
    name: 'ShoppingMange',
    component: () => import('@/views/shoppingMange/index.vue'),
    children: [
        {
            path: '/shoppingMange/user',
            name: 'ShoppingMangeUser',
            component: () => import('@/views/shoppingMange/user/index.vue'),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/shoppingMange/order',
            name: 'ShoppingMangeOrder',
            component: () => import('@/views/shoppingMange/order/index.vue'),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/shoppingMange/comment',
            name: 'ShoppingMangeComment',
            component: () => import('@/views/shoppingMange/comment/index.vue'),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/shoppingMange/goods',
            name: 'ShoppingMangeGoods',
            component: () => import('@/views/shoppingMange/goods/index.vue'),
            meta: {
                keepAlive: false // 不需要被缓存
            }
        }
    ]
}

export default shoppingMangeRouter
