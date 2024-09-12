package com.lpastine.ecommerce.service;

import com.lpastine.ecommerce.dto.Purchase;
import com.lpastine.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
