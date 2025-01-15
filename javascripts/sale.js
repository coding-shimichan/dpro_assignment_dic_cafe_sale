const products = {
  1: {
    name: "オリジナルブレンド 200g",
    price: 500,
  },
  2: {
    name: "オリジナルブレンド 500g",
    price: 900,
  },
  3: {
    name: "スペシャルブレンド 200g",
    price: 700,
  },
  4: {
    name: "スペシャルブレンド 500g",
    price: 1200,
  },
};
const form = document.querySelector("form");
const purchases = [];

function addToCart() {
  const addingItem = {
    name: products[form.product.value].name,
    price: parseInt(products[form.product.value].price),
    quantity: parseInt(form.quantity.value),
  };

  const existingItem = purchases.find(
    (itemInCart) => itemInCart.price === addingItem.price
  );

  if (existingItem) {
    existingItem.quantity += addingItem.quantity;
  } else {
    purchases.push(addingItem);
  }

  window.alert(`${itemLines(purchases)}\n小計: ${itemTotal(purchases)}円`);
  form.reset();
}

function itemTotal(items) {
  return items.reduce((result, currentItem) => {
    const subtotal = currentItem.price * currentItem.quantity;
    result += subtotal;
    return result;
  }, 0);
}

function itemLines(items) {
  return items
    .map((item) => {
      return `${item.name} ${item.price}円: ${item.quantity}点\n`;
    })
    .join("\n");
}

function shippingFee(itemTotal) {
  if (itemTotal === 0) {
    return 0;
  } else if (itemTotal < 2000) {
    return 500;
  } else if (2000 <= itemTotal && itemTotal < 3000) {
    return 250;
  } else if (itemTotal >= 3000) {
    return 0;
  }
}

function calc() {
  const _itemLines = itemLines(purchases);
  const _itemTotal = itemTotal(purchases);
  const _shippingFee = shippingFee(_itemTotal);

  window.alert(
    _itemLines +
      "\n" +
      `送料: ${_shippingFee}円` +
      "\n" +
      `合計金額: ${_itemTotal + _shippingFee}円`
  );
}
