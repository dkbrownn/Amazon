
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId,quantityValue) {
  let matchingItem;
  
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      console.log("666")
      matchingItem = cartItem;
      
    }else{
      
    }
  });
 
  if (matchingItem) {

    matchingItem.quantity = (matchingItem.quantity+quantityValue);
  } else {
    cart.push({
      productId: productId,
      quantity: quantityValue,
      deliveryOptionId: '1'
    });
  }
  let number=0;
  cart.forEach((cartItem) => {
    number+=cartItem.quantity;
  });
  console.log(number)
  document.querySelector('.js-cart-quantitys').innerHTML=number;

  saveToStorage();
  function added(){
    //addedTimeouts={};
    const productContainer=document.querySelector('.js-products-grid')
    const added=productContainer.querySelector('.added-to-cart');
    added.classList.add('is-visible');
    setTimeout(function() {
      added.classList.remove('is-visible');
    }, 3000);
    /*const timeoutId = setTimeout(() => {
      successMessageElement.classList.remove('is-visible');
    }, 2000);*/
  }
  added();
}
export function cartItemNumber(){
  let number=0;
  cart.forEach((cartItem)=>{
    number+=cartItem.quantity;
  })
  return number;
}
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}