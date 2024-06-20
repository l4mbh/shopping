import React, { useState } from "react";

import classes from "./CheckoutForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/orderSlice";
import { cartActions, getUserCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const [form, setForm] = useState({
    address: "",
    name: "",	
    phone: "",
    email: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const fieldsChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  const totalPrices = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  const checkOutHandler = () => {
    dispatch(createOrder({
      userCart: cartItems,
      orderTotalPrice: totalPrices(),
      address: form.address,
      name: form.name,
      phone: form.phone,
      email: form.email
    }));

    dispatch(getUserCart({ userId: user.userInfo.id }));

    dispatch(cartActions.setCartItems({products: [], quant: 0}));

    navigate("/order");

  }

  return (
    <div className={classes.checkout_form}>
      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Full name :</label>
        <input
          className={classes.checkout_formInput}
          type="text"
          name="name"
          placeholder="Enter your fullname here !"
          onChange={fieldsChangeHandler}
          value={form.name}
          required
        />
      </div>
      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Email :</label>
        <input
          className={classes.checkout_formInput}
          name="email"
          type="email"
          placeholder="Enter your email here !"
          value={form.email}
          onChange={fieldsChangeHandler}
          required
        />
      </div>
      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Phone :</label>
        <input
          className={classes.checkout_formInput}
          type="text"
          name="phone"
          placeholder="Enter your phone here !"
          value={form.phone}
          onChange={fieldsChangeHandler}
          required
        />
      </div>
      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Address :</label>
        <input
          onChange={fieldsChangeHandler}
          value={form.address}
          className={classes.checkout_formInput}
          type="text"
          name="address"
          placeholder="Enter your address here !"
          required
        />
      </div>
      <button onClick={checkOutHandler} className={classes.checkout_formBtn}>Place order</button>
    </div>
  );
}
