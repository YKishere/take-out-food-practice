let temp={a:1,b:2}
let asd="指定菜品半价(黄焖鸡,凉皮,),省13元"
var cc = 'mdifhfig'
let as=`============= 订餐明细 =============
黄焖鸡 x ${temp.a} = 18元
肉夹馍 x ${temp.b} = 12元
凉皮 x ${cc} = 8元
-----------------------------------
使用优惠:
${asd}
-----------------------------------
总计：25元
===================================`
console.log(as)