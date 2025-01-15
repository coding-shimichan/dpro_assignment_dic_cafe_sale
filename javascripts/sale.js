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

  form.reset();
}

function itemTotal() {
  return purchases.reduce((result, currentProduct) => {
    const subtotal = currentProduct.price * currentProduct.quantity;
    result += subtotal;
    return result;
  }, 0);
}

function itemLines() {
  return purchases.reduce((result, currentProduct) => {
    const messageLine = `${currentProduct.name} ${currentProduct.price}円: ${currentProduct.quantity}点\n`;
    result += messageLine;
    return result;
  }, "");
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

function showItemsInCart() {
  addToCart();
  window.alert(_itemsInCartMessage());

  function _itemsInCartMessage() {
    return itemLines() + "\n" + `小計: ${itemTotal()}円`;
  }
}

function calc() {
  const _itemLines = itemLines();
  const _itemTotal = itemTotal();
  const _shippingFee = shippingFee(_itemTotal);

  window.alert(
    _itemLines +
      "\n" +
      `送料: ${_shippingFee}円` +
      "\n" +
      `合計金額: ${_itemTotal + _shippingFee}円`
  );
}
