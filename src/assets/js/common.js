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
    },
    /**
         ** 加法函数，用来得到精确的加法结果
         ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
         ** 调用：accAdd(arg1,arg2)
         ** 返回值：arg1加上arg2的精确结果
         **/
    accAdd(arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);
        let r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            let cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    /**
** 减法函数，用来得到精确的减法结果
** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
** 调用：accSub(arg1,arg2)
** 返回值：arg1加上arg2的精确结果
**/
    accSub(arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    },
    /** 
** 除法函数，用来得到精确的除法结果
** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
** 调用：accDiv(arg1,arg2)
** 返回值：arg1除以arg2的精确结果
**/
    accDiv(arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
}

export default {
    commonJs
}
