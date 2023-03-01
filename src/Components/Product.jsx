import {
  Button,
  Card,
  FlexLayout,
  Loader,
  TextField,
} from "@cedcommerce/ounce-ui";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  fetchProducts,
  priceHightoLow,
  priceLowtoHigh,
  ratingHightoLow,
  ratingLowtoHigh,
  searchData,
} from "../slice/DataSlice";
import notFound from "../image/searchnotfound.webp";
export const Product = () => {
  const Data = useSelector((store) => store.DataSlice);
  const dispatch = useDispatch();
  // Dispatching action
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const [search, setSearch] = useState("");
  // Add to cart handler
  const AddtoCartHandler = (e) => {
    let flag = false;
    for (let i = 0; i < Data.cart.length; i++) {
      if (Data.cart[i].id === e) {
        alert("Already in cart");
        flag = true;
        return;
      }
    }
    if (flag === false) {
      Data.products.products.forEach((item) => {
        if (item.id === e) {
          var obj = {
            name: item.title,
            id: item.id,
            stock: item.stock,
            price: item.price,
            image: item.thumbnail,
            quantity: 1,
          };
          dispatch(addCart(obj));
          alert("Added in cart");
        }
      });
    }
  };
  // searching products
  const SearchHandler = (e) => {
    setSearch(e);
    let searchtemp = [];
    if (e.length >= 2) {
      Data.products.products.forEach((element) => {
        let title = element.title.toLowerCase();
        if (title.startsWith(e)) {
          searchtemp.push(element);
        }
      });
      dispatch(searchData(searchtemp));
    }
  };
  const selectHandler = (e) => {
    if (e.target.value === "PHL") {
      dispatch(priceHightoLow());
    } else if (e.target.value === "PLH") {
      dispatch(priceLowtoHigh());
    } else if (e.target.value === "RHL") {
      dispatch(ratingHightoLow());
    } else if (e.target.value === "RLH") {
      dispatch(ratingLowtoHigh());
    }
  };
  return (
    <div style={{}}>
      {Data.loader ? (
        <>
          <Loader title="Please wait while we are loading" />
        </>
      ) : (
        // <Card>
        <div
          className="flexcontainer"
          style={{
            textAlign: "center",
            margin: "auto",
          }}
        >
          <div>
            <Card extraClass="Title Card">
              <FlexLayout
                desktopWidth="50"
                mobileWidth="100"
                spacing="extraLoose"
                tabWidth="50"
              >
                <TextField
                  autocomplete="off"
                  onChange={(e) => SearchHandler(e)}
                  placeHolder="Search Here..."
                  type="text"
                />
                <select
                  onChange={selectHandler}
                  class="form-select"
                  aria-label="Default select example p-5"
                  style={{ padding: "1%", fontSize: "16px" }}
                >
                  <option selected>Filter Products</option>
                  <option value="PHL">Price(High to Low)</option>
                  <option value="PLH">Price(Low to High)</option>
                  <option value="RHL">Rating(High to low)</option>
                  <option value="RLH">Rating(low to high)</option>
                </select>
              </FlexLayout>
            </Card>
          </div>
          {search.length === 0 || search.length < 2 ? (
            <center>
              <FlexLayout
                childWidth="none"
                direction="none"
                directionMob="none"
                directionTab="none"
                halign="evenly"
                halignMob="none"
                halignTab="none"
                order="Order"
                spacing="extraLoose"
                valign="none"
                valignMob="none"
                valignTab="none"
                wrap="wrap"
                wrapMob="none"
                wrapTab="none"
              >
                {Data.products.products !== undefined ? (
                  // <div className="Container">
                  Data.products.products.map((val) => (
                    <div className="Card">
                      <Card cardType="Bordered">
                        <img
                          src={val.thumbnail}
                          alt=""
                          className="product_img"
                        />
                        <p className="title">{val.title}</p>
                        <div
                          style={{
                            display: "flex",
                            columnGap: "60%",
                            fontSize: "20px",
                          }}
                          className=""
                        >
                          <p className="Description">{val.rating}⭐</p>
                          <p style={{ float: "right" }}>₹{val.price}</p>
                        </div>
                        <div className="Cart_button" style={{}}>
                          <Button
                            content="Add to cart"
                            type="Outlined"
                            length="fullBtn"
                            value={val.id}
                            onClick={() => AddtoCartHandler(val.id)}
                          />
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  // </div>
                  <Loader title="Please wait while we are loading" />
                )}
              </FlexLayout>
            </center>
          ) : Data.search.length > 0 ? (
            <FlexLayout
              childWidth="none"
              direction="none"
              directionMob="none"
              directionTab="none"
              halign="evenly"
              halignMob="none"
              halignTab="none"
              order="Order"
              spacing="extraLoose"
              valign="none"
              valignMob="none"
              valignTab="none"
              wrap="wrap"
              wrapMob="none"
              wrapTab="none"
            >
              {Data.products.products !== undefined ? (
                Data.search.map((val) => (
                  <div className="Card">
                    <Card cardType="Bordered">
                      <img src={val.thumbnail} alt="" className="product_img" />
                      <p className="title">{val.title}</p>
                      <div
                        style={{
                          display: "flex",
                          columnGap: "60%",
                          fontSize: "20px",
                        }}
                        className=""
                      >
                        <p className="Description">{val.rating} ⭐</p>
                        <p style={{ float: "right" }}>₹{val.price}</p>
                      </div>
                      <div className="Cart_button" style={{}}>
                        <Button
                          content="Add To Cart"
                          type="Outlined"
                          length="fullBtn"
                          value={val.id}
                          onClick={() => AddtoCartHandler(val.id)}
                        />
                      </div>
                    </Card>
                  </div>
                ))
              ) : (
                <Loader title="Please wait while we are loading" />
              )}
            </FlexLayout>
          ) : (
            <img src={notFound} alt="" />
          )}
        </div>
        // </Card>
      )}
    </div>
  );
};
