import { getData } from '@/api/api.js'

const cartSku = {
    data() {
        return {
            goodsId: 2000,
            //   商品规格对象
            skuObj: {
                //   商品id
                goodsId: 0,
                // 商品限购数
                quota: 0,
                // 库存阈值。低于这个值会把库存数高亮显示
                stockThreshold: 50
            },
            //   商品属性弹出层默认选中商品属性对象
            initialSku: {},
            //   商品规格数据
            sku: {
                tree: [
                    // {
                    //     k: '颜色', // skuKeyName：规格类目名称
                    //     k_id: 1,
                    //     k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    //     v: [
                    //         {
                    //             id: '1101', // skuValueId：规格值 id
                    //             name: '红色', // skuValueName：规格值名称
                    //             imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png', // 规格类目图片，只有第一个规格类目可以定义图片
                    //             previewImgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png' // 用于预览显示的规格类目图片
                    //         },
                    //         {
                    //             id: '1102',
                    //             name: '蓝色',
                    //             imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png',
                    //             previewImgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png'
                    //         }
                    //     ],
                    //     largeImageMode: false //  是否展示大图模式
                    // },
                    // {
                    //     k: '尺寸', // skuKeyName：规格类目名称
                    //     k_id: 2,
                    //     k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    //     v: [
                    //         {
                    //             id: '1201', // skuValueId：规格值 id
                    //             name: '40', // skuValueName：规格值名称
                    //             imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png',
                    //             previewImgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png'
                    //         },
                    //         {
                    //             id: '1202',
                    //             name: '41'
                    //         }
                    //     ],
                    //     largeImageMode: false //  是否展示大图模式
                    // },
                    // {
                    //     k: '大小', // skuKeyName：规格类目名称
                    //     k_id: 3,
                    //     k_s: 's3', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    //     v: [
                    //         {
                    //             id: '1301', // skuValueId：规格值 id
                    //             name: '小' // skuValueName：规格值名称
                    //         },
                    //         {
                    //             id: '1302',
                    //             name: '大'
                    //         }
                    //     ],
                    //     largeImageMode: false //  是否展示大图模式
                    // }
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    // {
                    //     id: 2000,
                    //     s1: '1101',
                    //     s2: '1201',
                    //     s3: '1301',
                    //     price: 100,
                    //     stock_num: 100
                    // }
                ],
                price: '0.00',
                stock_num: 0, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: false // 是否隐藏剩余库存
            },
            goods: {
                // 默认商品 sku 缩略图
                picture: ''
            },
        }
    },
    methods: {
        // 获取商品规格和属性
        async getGoodsproperty(id) {
            const res = await getData(
                '/product/property/find',
                {
                    productId: id
                },
                { showLoading: false }
            )
            console.log(res)
            if (res.code === '0') {
                this.productInfoProperties = res.data.productInfoProperties
                this.productInfoSpecifications = res.data.productInfoSpecifications
                this.initSkuData(res.data)
                return false
            }
            return this.$toast.fail(res.msg)
        },
        // 初始化商品规格弹出层数据
        initSkuData(data) {
            // 商品属性
            data.productInfoProperties.forEach(e => {
                const goodPropery = {
                    k: e.propertyName,
                    k_id: e.id + '',
                    k_s: 's' + e.id,
                    v: [],
                    largeImageMode: false
                }
                e.productPropertyValues.forEach(c => {
                    const goodProperyChil = {
                        id: c.id + '',
                        name: c.propertyValue,
                        price: e.price ? e.price * 100 : 0
                    }
                    c.picAddress && (goodProperyChil.imgUrl = 'https://jixi.mynatapp.cc/' + c.picAddress)
                    c.picAddress && (goodProperyChil.previewImgUrl = 'https://jixi.mynatapp.cc/' + c.picAddress)
                    goodPropery.v.push(goodProperyChil)
                })
                this.sku.tree.push(goodPropery)
            })
            // 商品规格
            if (data.productInfoSpecifications.length > 0) {
                const specifications = {
                    k: '规格',
                    k_id: 10001,
                    k_s: 's10001',
                    v: [],
                    largeImageMode: false
                }
                data.productInfoSpecifications.forEach(e => {
                    const v = {
                        id: e.id + '',
                        name: e.specificationName,
                        price: e.price ? e.price * 100 : 0
                    }
                    specifications.v.push(v)
                })
                this.sku.tree.push(specifications)
            }
            // 将数据映射到vant sku list 上，进行绑定
            this.handleSkuList()
        },
        // 处理vant sku组件需要将商品属性进行一对一绑定
        handleSkuList() {
            const skuTree = this.sku.tree
            const index = skuTree.length
            if (index === 0) {
                return false
            }
            // 分类讨论，根据有多少个属性类来将数据绑定到sku的list中，由于后台限制了商家最多只能添加三大类所以就三种情况
            if (index === 1) {
                const initialSku = {
                    [skuTree[0]]: skuTree[0].v[0].id,
                    selectedNum: 1
                }
                // 设置商品属性弹出层默认选中商品参数
                this.initialSku = initialSku
                let price = null
                for (let a = 0; a < skuTree.length; a++) {
                    const k_s1 = skuTree[a].k_s
                    for (let b = 0; b < skuTree[a].v.length; b++) {
                        price = Number(this.sku.price * 100) + Number(skuTree[a].v[b].price)
                        const list = {
                            id: this.goodsId,
                            [k_s1]: skuTree[a].v[b].id + '',
                            price,
                            stock_num: this.sku.stock_num
                        }
                        this.sku.list.push(list)
                        this.goodsId++
                    }
                }
            } else if (index === 2) {
                const initialSku = {
                    [skuTree[0].k_s]: skuTree[0].v[0].id,
                    [skuTree[1].k_s]: skuTree[1].v[0].id,
                    selectedNum: 1
                }
                // 设置商品属性弹出层默认选中商品参数
                this.initialSku = initialSku
                let price = null
                for (let a = 0; a < skuTree.length - 1; a++) {
                    const k_s1 = skuTree[a].k_s
                    const k_s2 = skuTree[a + 1].k_s
                    for (let b = 0; b < skuTree[a].v.length; b++) {
                        for (let c = 0; c < skuTree[a + 1].v.length; c++) {
                            price =
                                Number(this.sku.price * 100) +
                                Number(skuTree[a].v[b].price) +
                                Number(skuTree[a + 1].v[c].price)
                            const list = {
                                id: this.goodsId,
                                [k_s1]: skuTree[a].v[b].id + '',
                                [k_s2]: skuTree[a + 1].v[c].id + '',
                                price,
                                stock_num: this.sku.stock_num
                            }
                            this.sku.list.push(list)
                            this.goodsId++
                        }
                    }
                }
            } else {
                const initialSku = {
                    [skuTree[0].k_s]: skuTree[0].v[0].id,
                    [skuTree[1].k_s]: skuTree[1].v[0].id,
                    [skuTree[2].k_s]: skuTree[2].v[0].id,
                    selectedNum: 1
                }
                // 设置商品属性弹出层默认选中商品参数
                this.initialSku = initialSku
                let price = null
                for (let a = 0; a < skuTree.length - 2; a++) {
                    const k_s1 = skuTree[a].k_s
                    const k_s2 = skuTree[a + 1].k_s
                    const k_s3 = skuTree[a + 2].k_s
                    for (let b = 0; b < skuTree[a].v.length; b++) {
                        for (let c = 0; c < skuTree[a + 1].v.length; c++) {
                            for (let d = 0; d < skuTree[a + 2].v.length; d++) {
                                // 计算选中属性的价格
                                price =
                                    Number(this.sku.price) * 100 +
                                    Number(skuTree[a].v[b].price) +
                                    Number(skuTree[a + 1].v[c].price) +
                                    Number(skuTree[a + 2].v[d].price)

                                const list = {
                                    id: this.goodsId,
                                    [k_s1]: skuTree[a].v[b].id + '',
                                    [k_s2]: skuTree[a + 1].v[c].id + '',
                                    [k_s3]: skuTree[a + 2].v[d].id + '',
                                    price,
                                    stock_num: this.sku.stock_num
                                }

                                this.sku.list.push(list)
                                this.goodsId++
                            }
                        }
                    }
                }
            }
            // 停止动画
            this.$toast.clear()
        },
    },
}

export default cartSku
