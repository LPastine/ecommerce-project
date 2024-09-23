package com.lpastine.ecommerce.service;

import com.lpastine.ecommerce.dto.PaymentInfo;
import com.lpastine.ecommerce.dto.Purchase;
import com.lpastine.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
