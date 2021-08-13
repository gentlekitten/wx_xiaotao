// 零食、外卖店铺混入
import { upData, getData } from '@/api/api.js'

import { ImagePreview } from 'vant'

const takeOutShop = {
    data() {
        return {
            id: 0,
            searchIsShow: false,
            // 是否收藏
            isCollect: false,
            overlayIsShow: false,
            noticeIsShow: true,
            // tab index
            tabIndex: Number(window.sessionStorage.getItem('tabActiveShop')),
            cartList: JSON.parse(window.sessionStorage.getItem('cartList'))
                ? JSON.parse(window.sessionStorage.getItem('cartList'))
                : [],
            tabList: [
                {
                    title: '商品'
                },
                {
                    title: '评价'
                },
                {
                    title: '商家'
                }
            ],
            sidebarList: [],
            // 保存的一份商品列表
            allShopList: [],
            // 搜索之前的商品列表
            searchShopListBefore: [],
            // 商品信息列表
            shopList: [],
            // 评价信息列表
            evaluateInfoObj: {},
            // 用户评价列表
            commentList: [],
            // 店铺信息
            shopInfoObj: {},
            pageIndex: 0
        }
    },
    methods: {
        // 获取评论信息
        async getCommentList() {
            const data = {
                shopId: this.id,
                pageIndex: this.pageIndex,
                pageLimit: 10
            }
            const res = await getData('/shop/comment/find', data, { showLoading: false })
            this.loading = false
            console.log(res)
            if (res.code === '0') {
                res.data.productComment.forEach(e => {
                    if (e.attitude || e.attitude === 0) {
                        e.commentScore = (e.attitude + e.quality + e.sTime) / 6
                    }
                })
                this.commentList.push(...res.data.productComment)
                if (Object.keys(this.evaluateInfoObj).length <= 0 && Object.keys(this.commentList.shopScore).length > 0) {
                    this.evaluateInfoObj = this.commentList.shopScore
                }
                this.pageIndex += 1
                if (this.pageIndex * 10 >= res.data.number) {
                    this.finished = true
                }
                return false
            }
            this.$handleCode.handleCode(res)
        },
        // 上拉加载评论信息
        async onLoadData() {
            if (this.tabIndex === 1 && this.commentList.length > 0) {
                this.getCommentList()
            }
        },
        // 获取店铺信息
        async getShopInfo() {
            const res = await getData(
                '/site/snack/shop/info',
                { shopId: this.id },
                { showLoading: true }
            )
            console.log(res)
            if (res.code === '0') {
                this.shopInfoObj = res.data
                window.sessionStorage.setItem('shopInfoObj', JSON.stringify(this.shopInfoObj))
                // shopState!== 1 店铺不营业，这里店铺不营业或有促销公告都展示遮蔽层，然后在组建中再判断
                if (
                    this.shopInfoObj.salesPromotion ||
                    this.shopInfoObj.shopState !== 1
                ) {
                    this.noticeIsShow = true
                }
                this.isCollect = this.shopInfoObj.hasRecord === 0 ? false : true
                return false
            }
            this.$handleCode.handleCode(res)
        },
        // 获取商品信息
        async getGoodsList() {
            const res = await getData(
                '/shop/snack/info/find',
                { shopId: this.id },
                { showLoading: true }
            )
            console.log(res)
            if (res.code === '0') {
                res.data.forEach(e => {
                    this.sidebarList.push({
                        title: e.categoryName,
                        id: e.id,
                        sort: e.sort
                    })
                })
                this.sidebarList.sort(this.handleSort)
                this.sidebarList.unshift({
                    id: 0,
                    title: '全部分类',
                    sort: 99999999999
                })
                res.data.forEach(e => {
                    e.productInfos.sort(this.handleSort)
                    e.productInfos.forEach(c => {
                        c.num = 1
                        c.isCheck = true
                    })
                })
                this.shopList = res.data
                this.allShopList = res.data
                return false
            }
            this.$handleCode.handleCode(res)
        },
        // 处理侧边栏排序和商品排序
        handleSort(a, b) {
            return b.sort - a.sort
        },
        // 处理添加商品
        handleAdd(addItem) {
            // addItem.d是productInfoSpecifications的id
            console.log(addItem)
            let addObj = {}
            let isFood = false
            // 判断cartList对象是否存在
            if (!this.cartList.id) {
                this.cartList = {
                    id: this.shopInfoObj.shopId,
                    shopOrders: this.shopInfoObj.shopOrder,
                    shopPic: this.shopInfoObj.shopPic,
                    shopName: this.shopInfoObj.shopName,
                    shopList: []
                }
            }
            // 判断添加的对象是否有规格，判断商品存在，不仅要判断商品id是否一样如果规格存在的话还要判断规格id是否相同
            if (addItem.d) {
                this.cartList.shopList.forEach(e => {
                    if (e.id === addItem.id) {
                        isFood = e.productInfoSpecifications.some(item => {
                            return addItem.d === item.id
                        })
                        if (isFood) {
                            return
                        }
                    }
                })
            } else {
                isFood = this.cartList.shopList.some(item => {
                    return addItem.id === item.id
                })
            }
            // 处理商品已经存在
            if (isFood) {
                let foodIndex = 0
                if (addItem.d) {
                    foodIndex = this.cartList.shopList.findIndex(item => {
                        if (item.productInfoSpecifications.length <= 0) {
                            return false
                        }
                        return item.productInfoSpecifications[0].id === addItem.d
                    })
                } else {
                    foodIndex = this.cartList.shopList.findIndex(item => {
                        return addItem.id === item.id
                    })
                }
                this.cartList.shopList[foodIndex].num++
            } else {
                addObj = this._.cloneDeep(addItem)
                if (addItem.d) {
                    // 处理规格 d是选中的规格的id
                    let productInfoSpecifications = []
                    productInfoSpecifications = addObj.productInfoSpecifications.filter(
                        e => {
                            return e.id === addItem.d
                        }
                    )
                    addObj.productInfoSpecifications = productInfoSpecifications
                }
                this.cartList.shopList.push(addObj)
            }
            // this.addCart(this.cartList)
            window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
        },
        // 侧边栏改变
        sidebarChange(index) {
            this.shopList = this.allShopList
            const sidebarId = this.sidebarList[index].id
            // index === 0 是全部分类
            if (index === 0) {
                return false
            }
            this.shopList = this.shopList.filter(e => {
                return e.id === sidebarId
            })
        },
        // 购物车提交
        cartSubmit(foodTotalPrice, discountPrice) {
            this.cartList.totalPrice = foodTotalPrice
            this.cartList.discountPrice = discountPrice
            window.sessionStorage.setItem('shopCartList', JSON.stringify(this.cartList))
            // form 0外卖 1 商城
            this.$router.push('/shoppingOrderView?form=0')
        },
        changeTab(index) {
            this.tabIndex = index
        },
        // 处理点击评论区图片
        clickCommnetImg(itemImgs, indexs) {
            let images = []
            itemImgs.forEach((e) => {
                images.push(e.picAddress)
            })
            ImagePreview({
                images,
                startPosition: indexs
            })
        },
        // 清空购物车
        clearCart() {
            this.cartList = {}
            window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
        },
        // 处理点击商家执照图片
        clickImg(imgUrl, indexs) {
            ImagePreview({
                images: imgUrl,
                startPosition: indexs
            })
        },
        // 删除单个商品
        deleteFood(item) {
            // 删除商品的索引
            let foodIndex = 0
            // 判断有无规格
            if (item.productInfoSpecifications.length > 0) {
                foodIndex = this.cartList.shopList.findIndex(e => {
                    if (e.productInfoSpecifications.length <= 0) {
                        return false
                    }
                    return (
                        e.productInfoSpecifications[0].id ===
                        item.productInfoSpecifications[0].id
                    )
                })
            } else {
                foodIndex = this.cartList.shopList.findIndex(i => {
                    return item.id === i.id
                })
            }
            this.cartList.shopList.splice(foodIndex, 1)
            if (this.cartList.shopList.length <= 0) {
                this.cartList = {}
            }
            window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
        },
        // 商品数量该表更新数据
        shopNumChange() {
            window.sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
        },
        // 下拉选择
        // dropdownChange(index) {
        //   this.dropdownObj = this.dropdownList[index]
        // },
        // 展示搜索弹出层
        toSearch(searchIsShow) {
            this.searchIsShow = searchIsShow
        },
        // 处理拨打电话事件
        toPhone() {
            const phoneNum = this.shopInfoObj.shopPhone
            window.location.href = 'tel:' + phoneNum
        },
        // 展示分享遮蔽层
        toShare() {
            this.overlayIsShow = true
        },
        // 商品搜索事件
        clickShopSearch(shopSearchValue) {
            if (shopSearchValue !== '') {
                this.searchShopListBefore = this._.cloneDeep(this.shopList)
                this.shopList = this.searchShopListBefore
                this.shopList.forEach(e => {
                    e.productInfos = e.productInfos.filter(c => {
                        return c.productName.indexOf(shopSearchValue) !== -1
                    })
                })
                this.searchIsShow = false
            } else {
                this.$toast.fail('请输入搜索内容！')
            }
        },
        // 点击收藏店铺
        async toCollect() {
            if (!this.id) {
                return false
            }
            const url = !this.isCollect ? '/shop/record/add' : '/shop/record/delete'
            const res = await upData(url, { shopId: this.id }, { showLoading: true })
            console.log(res)
            if (res.code === '0') {
                this.isCollect = !this.isCollect
                let message = this.isCollect ? '收藏成功！' : '已取消收藏！'
                this.$toast({
                    message,
                    position: 'bottom'
                })
                return false
            }
            this.$handleCode.handleCode(res)
        }
    }
}

export default takeOutShop