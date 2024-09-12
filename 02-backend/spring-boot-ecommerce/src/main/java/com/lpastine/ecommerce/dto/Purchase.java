package com.lpastine.ecommerce.dto;

import com.lpastine.ecommerce.entity.Address;
import com.lpastine.ecommerce.entity.Customer;
import com.lpastine.ecommerce.entity.Order;
import com.lpastine.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
