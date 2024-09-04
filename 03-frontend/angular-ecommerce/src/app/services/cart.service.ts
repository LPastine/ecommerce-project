import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find((item) => item.id === cartItem.id);

      // check if we found it
      alreadyExistsInCart = existingCartItem !== undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem && existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`Contents of the cart`);
    for (const cartItem of this.cartItems) {
      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(
        `name: ${cartItem.name}, quantity=${cartItem.quantity}, unitPrice=${cartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('-------------------------');
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex((item) => item.id === cartItem.id);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
