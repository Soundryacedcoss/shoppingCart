import { Card, FlexLayout, PageHeader } from "@cedcommerce/ounce-ui";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../image/logo.jpg";
import { Carousell } from "./Carousell";
import { Product } from "./Product";
export const Navbar = () => {
  const data = useSelector((store) => store.DataSlice);
  return (
    <>
      <div className="Navbarcontainer">
        <Card>
          <PageHeader
            action={
              <div style={{ marginRight: "35%" }}>
                <FlexLayout spacing="loose" wrap="noWrap">
                  <i
                    class="fas fa-user-alt"
                    style={{ fontSize: "30px", color: "#d45f4d" }}
                  ></i>

                  <i
                    class="material-icons"
                    style={{ fontSize: "35px", color: "#fbc259" }}
                  >
                    home
                  </i>
                  <Link to={"/Cart"}>
                    <i
                      class="fas fa-shopping-cart"
                      style={{ fontSize: "30px", color: "dodgerblue" }}
                    ></i>
                  </Link>
                  <b style={{fontSize:"20px"}}>{data.cart.length}</b>
                </FlexLayout>
              </div>
            }
            title={<img src={logo} alt="" className="logo" />}
          />
        </Card>
      </div>
      <Carousell />
      <Product />
    </>
  );
};
