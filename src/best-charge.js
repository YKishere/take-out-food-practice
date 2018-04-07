function bestCharge(selectedItems) {
  return summary()
  //根据优惠方式输出不同的汇总信息
  function summary() {
    let as = `
============= 订餐明细 =============
${orderDetails()}${discountCharge()[0]}
-----------------------------------
总计：${discountCharge()[1]}元
===================================`
    return as
  }

  //替换订餐明细
  function orderDetails() {
    let orderDetails = '';
    for (var k in loadItems(selectedItems)) {
      if (k < loadItems(selectedItems).length - 1) {
        orderDetails += loadItems(selectedItems)[k].name + ' x ' + loadItems(selectedItems)[k].amout + ' = ' + loadItems(selectedItems)[k].price * loadItems(selectedItems)[k].amout + '元\n'
      } else {
        orderDetails += loadItems(selectedItems)[k].name + ' x ' + loadItems(selectedItems)[k].amout + ' = ' + loadItems(selectedItems)[k].price * loadItems(selectedItems)[k].amout + '元'
      }
    }
    return orderDetails
  }

  //替换使用优惠、总价
  function discountCharge() {
    let sumCharge = sum();
    if (secendDiscountCharge()[0] > 6) {
      var item = '';
      for (var m in secendDiscountCharge()[1]) {
        if (m < secendDiscountCharge()[1].length - 1) {
          item += secendDiscountCharge()[1][m] + '，'
        } else {
          item += secendDiscountCharge()[1][m]
        }
      }
      var discountType = '\n' + '-----------------------------------\n' + '使用优惠:\n' + '指定菜品半价' + '(' + item + ')，' + '省13元'
      sumCharge = sumCharge - secendDiscountCharge()[0]
    } else {
      if (sumCharge > 30) {
        var discountType = '\n' + '-----------------------------------\n' + '使用优惠:\n' + '满30减6元，省6元'
        sumCharge = sumCharge - 6
      } else {
        var discountType = ''
      }
    }
    return [discountType, sumCharge]
  }

  //获取菜单、数量
  function loadItems(selectedItems) {
    var loadItems = [];
    var id = 'id';
    var amout = 'amout';
    var name = 'name'
    var price = 'price';
    for (var i in selectedItems) {
      for (var j in loadAllItems()) {
        var arr = selectedItems[i].split(" ");
        if (arr[0] == loadAllItems()[j].id) {
          loadItems.push({
            id: loadAllItems()[j].id,
            name: loadAllItems()[j].name,
            price: loadAllItems()[j].price,
            amout: parseInt(selectedItems[i].split(" ")[2])
          })
        }
      }
    }
    return loadItems
  }

  //获取总值
  function sum() {
    var sum = 0;
    for (var i in loadItems(selectedItems)) {
      sum = sum + loadItems(selectedItems)[i].price * loadItems(selectedItems)[i].amout
    }
    return sum
  }

  //获取第二种方式优惠价以及半价菜品
  function secendDiscountCharge() {
    var discountSum = 0;
    var countItems = [];
    for (var i in loadItems(selectedItems)) {
      for (var j in loadPromotions()[1].items) {
        if (loadItems(selectedItems)[i].id == loadPromotions()[1].items[j]) {
          discountSum = discountSum + loadItems(selectedItems)[i].price / 2
          countItems.push(loadItems(selectedItems)[i].name)
        }
      }
    }
    return [discountSum, countItems];
  }

}

function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

