const commonJs = {
    // 自定义计算相加函数（解决js小数相加问题）
    addNum(array) {
        if (array.length <= 0) {
            return 0
        }
        const arr = array
        const fieldArr = []
        for (var i = 0; i < arr.length; i++) {
            var m, field
            try {
                field = arr[i].toString().split('.')[1].length
            } catch (e) {
                field = 0
            }
            fieldArr.push(field)
        }
        m = Math.pow(10, Math.max(...fieldArr))
        let add = 0
        arr.forEach(function (item) {
            add = add + item * m
        })
        let sum = Math.round(add) / m
        return sum
    }
}

export default {
    commonJs
}
