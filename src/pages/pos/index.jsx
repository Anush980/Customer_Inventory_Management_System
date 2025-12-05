import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import "./pos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryOptions } from "../../data/filterConfig/inventoryFilterConfigs";
import { useInventory } from "../../hooks/useInventory";
import axios from "axios";

const Pos = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");


  const { items, loading } = useInventory({
    search,
    category: category === "all" ? "" : category,
    sort: "newest",
    stock: "",
  });

  const [cart, setCart] = useState([]);


  const addToCart = (item) => {
    const exists = cart.find((x) => x._id === item._id);

    // Item already in cart
    if (exists) {
      if (exists.qty < item.stock) {
        // increase qty
        setCart(
          cart.map((x) =>
            x._id === item._id ? { ...x, qty: x.qty + 1 } : x
          )
        );
      } else {
        alert("Cannot add more than available stock!");
      }
      return;
    }

    // First time adding
    if (item.stock > 0) {
      setCart([...cart, { ...item, qty: 1 }]);
    } else {
      alert("Item out of stock!");
    }
  };


  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty < item.stock
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };


  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };


  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const total = subtotal;
  const checkoutHandler=async()=>{
    if (cart.length===0){
      alert("Your cart is empty");
      return ;
    }
    try{
      const saleDate={
        items:cart.map((item)=>({
          product:item._id,
          quantity:item.qty,
        })),
        discount:0,
        paymentType:"cash",
        walkInCustomer:"Walk-in"
      };
      const token = localStorage.getItem("token");
      await axios.post(
       `${process.env.REACT_APP_API_URL}/api/sales`,saleDate,{
        headers:{
          Authorization: `Bearer ${token}`
        }
       }
      );
      alert("Sales completed successfully!");
      setCart([]);
    }
    catch(err){
      console.error(err);
      alert(err,"Sales failed..")
    }
  };

  return (
    <Layout>
      {/* Floating "Go to Cart" button */}
      <button
        className="go-to-cart-btn"
        onClick={() => window.scrollTo({ top: 99999, behavior: "smooth" })}
      >
        <FontAwesomeIcon icon="shopping-cart"/>View Cart ({cart.length})
      </button>

      <div className="pos-wrapper">
        <Pageheader title="Point of Sale" btnTitle="Recent Sales" />

        <div className="pos-container">

          {/* ========================================
              🛍 PRODUCT SECTION
              ======================================== */}
          <div className="product-section">
            <div className="product-header">
              <h3>Products</h3>

              {/* Search Bar */}
              <div className="pos-search">
                <FontAwesomeIcon icon="search"/>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="product-tabs">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="product-tab"
                style={{ width: "180px" }}
              >
                <option value="all">All Categories</option>

                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product List Grid */}
            <div className="products-container">
              <div className="products-grid">

                
                {loading && <p>Loading...</p>}
                {items.length === 0 && !loading && (
                  <p className="no-products">No products found.</p>
                )}

                {/* Product Cards */}
                {items.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img
                      src={item.image}
                      className="product-image"
                      alt={item.itemName}
                    />

                    <div className="product-name">{item.itemName}</div>
                    <div className="product-category">{item.category}</div>
                    <div className="product-price">₹{item.price}</div>

                    {/* Stock Display */}
                    <div
                      className={
                        item.stock === 0
                          ? "product-stock out"
                          : item.stock < 5
                          ? "product-stock low"
                          : "product-stock"
                      }
                    >
                      {item.stock === 0
                        ? "Out of Stock"
                        : `Stock: ${item.stock}`}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: "10px", width: "100%" }}
                      onClick={() => addToCart(item)}
                      disabled={item.stock === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* ========================================
              🛒 CART SECTION
              ======================================== */}
          <div className="cart-section">
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <span>{cart.length} items</span>
            </div>

            {/* Cart Items */}
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-state">
                  <FontAwesomeIcon icon="shopping-cart"/>
                  <p>Your cart is empty</p>
                  <p>Add products to get started</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item._id}>
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.itemName}</span>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>

                    <div className="cart-item-controls">
                      {/* Decrease */}
                      <button className="qty-btn" onClick={() => decreaseQty(item._id)}>–</button>

                      {/* Quantity */}
                      <span className="cart-qty">{item.qty}</span>

                      {/* Increase */}
                      <button className="qty-btn" onClick={() => increaseQty(item._id)}>+</button>

                      {/* Remove */}
                      <button
                        className="delete-btn"
                        onClick={() =>
                          setCart(cart.filter((x) => x._id !== item._id))
                        }
                      >
                        <FontAwesomeIcon icon="trash-can" className="remove-btn"/>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals + Checkout */}
            <div className="cart-footer">
              <div className="cart-totals">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="total-line final">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn btn-success checkout-btn"onClick={checkoutHandler}>
                <FontAwesomeIcon icon="credit-card"/> Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Pos;
