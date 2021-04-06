// 实时监听 state 值的最新状态，this.$store.getters.roleList
const getters = {
  roleList: state => state.user.roleList,
  user: state => state.user.user,
  dept: state => state.user.dept,
  token: state => state.user.token,
  // shopInfo
  shopItem: state => state.shopInfo.shopItem,
  // addressInfo
  addressId: state => state.addressInfo.addressId,
  addressItem: state => state.addressInfo.addressItem,
  // shoppingManage addGoods
  categoryId: state => state.addGoods.categoryId,
  inventory: state => state.addGoods.inventory,
  detailUrl: state => state.addGoods.detailUrl,
  addGoodsForm: state => state.addGoods.addGoodsForm,
  imgList: state => state.addGoods.imgList,
  productInfoProperties: state => state.addGoods.productInfoProperties,
  productInfoSpecifications: state => state.addGoods.productInfoSpecifications,
  // addShopping
  time: state => state.addShopping.time,
  discounts: state => state.addShopping.discounts,
  addShoppingList: state => state.addShopping.imgList,
  form: state => state.addShopping.form,
  //  scopeSetting
  siteAddress: state => state.scopeSetting.address,
  applyForForm: state => state.scopeSetting.form,
  //  secondaryMarket addGoods
  productDetailAddress: state => state.secondaryMarket.productDetailAddress,
  secondAddGoodsForm: state => state.secondaryMarket.addGoodsForm,
  swiperImg: state => state.secondaryMarket.swiperImg,
  logoImg: state => state.secondaryMarket.logoImg,
}
export default getters
