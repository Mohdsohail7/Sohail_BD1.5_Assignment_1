const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Server-side values
const freshShippingThreshold = 100;
const taxRate = 0.05;
const discountPercentage = 10;
const loyaltyRate = 2;

// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = 0;

  if (newItemPrice != 0) {
      cartTotal = cartTotal + newItemPrice;
    res.send("Total price is: " + cartTotal);
  } else {
    res.send("Invalid cartItem");
  }
});

// Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let finalPrice;

    if (isMember === "true") {
      finalPrice = cartTotal - (cartTotal * (discountPercentage / 100));
    res.send(finalPrice.toString());
} else {
    finalPrice = "no discount is applied";
      res.send(finalPrice.toString())
}
});

// Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartAmount;
  if (cartTotal != 0) {
    cartAmount = cartTotal * taxRate;
  }
  res.send(cartAmount.toString());
});

//Endpoint 4 Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;

  if (distance != 0) {
    let deliveryDays;

    if (shippingMethod === "standard") {
      deliveryDays = distance / 50;
    } else if (shippingMethod ===  "express") {
      deliveryDays = distance / 100;
    } else {
      res.send("invalid shipping method");
    }
    res.send(deliveryDays.toString())
  } else {
    res.send("invalid distance");
  }
});

 // Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  if (distance != 0) {
    let shippinpCost = weight * distance;
    res.send(shippinpCost.toString());
  } else {
    res.send("Invalid distance");
  }
  
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  if (purchaseAmount != 0) {
    let loyaltyPoint = loyaltyRate * purchaseAmount;

    res.send(loyaltyPoint.toString());
  } else {
    res.send("invalid purchase Amount");
  }
});

const port = 8000;
app.listen(port, () => {
  console.log("server is running on port number is: " + port);
});
