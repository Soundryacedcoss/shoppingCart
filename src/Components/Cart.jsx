import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import emptyCart from "../image/emptyCart.png";
import {
  decreseQuantity,
  deleteProduct,
  increseQuantity,
} from "../slice/DataSlice";
import "./Cart.css";
export const Cart = () => {
  const [Price, setPrice] = useState();
  const [Emptymsg, setEmptyMsg] = useState({
    display: "none",
    textAlign: "center",
  });
  const [Display, setDisplay] = useState();
  // Here i am using useNavigate for redirect to other page
  const navigate = useNavigate();
  const data = useSelector((store) => store.DataSlice);
  const dispatch = useDispatch();
  // Here i am checking that the user ois loged in or not
  useEffect(() => {}, []);
  // increase Button Functionaliy
  const IncreaseHandler = (val) => {
    for (let i = 0; i < data.cart.length; i++) {
      if (val === data.cart[i].id) {
        dispatch(increseQuantity(data.cart[i].id));
      }
    }
  };
  // decrese button functinality
  const DecreseHandler = (val) => {
    for (let i = 0; i < data.cart.length; i++) {
      if (val === data.cart[i].id) {
        dispatch(decreseQuantity(data.cart[i].id));
      }
    }
  };
  // Adding Price here
  let totalprice = 0;
  // Calculating price
  useEffect(() => {
    for (let i = 0; i < data.cart.length; i++) {
      totalprice += data.cart[i].quantity * data.cart[i].price;
      setPrice(totalprice);
      <Navigate to="/"></Navigate>;
    }
    if (data.cart.length === 0) {
      setDisplay({ display: "none" });
      setEmptyMsg({ display: "block" });
    }
  }, [data.cart]);
  // Buy button handler
  const BuyButtonHandler = (e) => {
    alert("Order Placed");
    navigate("/");
  };
  // Here i am deleting all item from cart
  function EmptyButtonHandler() {
    window.location.reload(false);
  }
  // Delete button handler
  const DeleteHandler = (e) => {
    let confirm = window.confirm("Products will delete");
    if (confirm === true) {
      data.cart.forEach((val) => {
        if (e === val.id) {
          dispatch(deleteProduct(val.id));
        }
      });
    }
  };
  return (
    <div>
      <div className="Cart">
        <div className="flex">
          <Link to={"/"}>
            <button className="BackBUtton">Back</button>
          </Link>
        </div>

        <p style={Emptymsg}>
          <center>
            <img src={emptyCart} alt="" />
          </center>
        </p>
        <div style={Display} className="cartDiv">
          <div className="ProductDetail">
            {data.cart.map((item) => (
              <div className="CartDivDeatail">
                <div className="Width">
                  <img className="CartImgDiv " src={item.image} alt="" />
                </div>{" "}
                <div className="ProductNameDiv Width">
                  {" "}
                  <p>{item.name}</p> <p>₹{item.price}</p>
                </div>{" "}
                <div className="quantityButtonDiv" style={{ display: "flex" }}>
                  <button
                    className="Quantitybutton rounded w-100"
                    onClick={() => IncreaseHandler(item.id)}
                  >
                    +
                  </button>
                  <b>{item.quantity}</b>
                  <button
                    className="Quantitybutton rounded w-100"
                    onClick={() => DecreseHandler(item.id)}
                  >
                    -
                  </button>
                  <i
                    class="fas fa-trash"
                    onClick={(e) => DeleteHandler(item.id)}
                    style={{
                      fontSize: "30px",
                      color: "red",
                      marginTop: "4%",
                      marginLeft: "4%",
                    }}
                  ></i>{" "}
                </div>
              </div>
            ))}
          </div>
          <p style={Display} className="TotalPrice">
            Total:₹ {Price} 
          </p>{" "}
          <br />
          <br />
          <div style={Display}>
            <button onClick={BuyButtonHandler} value="true" className="Button1">
              Buy Now
            </button>{" "}
            <button className="Button1" onClick={EmptyButtonHandler}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
