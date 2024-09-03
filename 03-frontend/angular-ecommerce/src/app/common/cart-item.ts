import { Product } from './product';

export class CartItem {
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(product: Product) {
    const { id, name, imageUrl, unitPrice } = product;

    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.unitPrice = unitPrice;
    this.quantity = 1;
  }
}
