import { useState } from "react";
import css from "./ShoppingCartPage.module.css";
import { postOrder } from "../../services/http/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCartPage = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ?? "";
  });

  const [order, setOrder] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    order: cart,
  });
  const notify = (message) => toast(message);
 
  const handleMedicinesDelete = (idDelete) => {
    setCart(cart.filter(({ id }) => id !== idDelete));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleCauntDecrement = (idCount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === idCount) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      })
    );

    setOrder({ ...order, order: cart });
  };

  const handleCauntIncrement = (count, idCount) => {
    if (count === 0) {
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === idCount) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
    );

    setOrder({ ...order, order: cart });
  };

  const onChangeInput = ({ target }) => {
    const { name, value } = target;

    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrder({
      ...order,
    });

    try {
      await postOrder(order);

      notify("Order sent");
      setOrder({
        name: "",
        email: "",
        phone: "",
        address: "",
        order: "",
        pharmacyOrder: "",
      });
      setCart("");

      localStorage.removeItem("cart");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      {localStorage.setItem("cart", JSON.stringify(cart))}
      <ToastContainer />
      <form onSubmit={handleOrderSubmit} className={css.form_container}>
        <div className={css.left_container}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={order.name}
              onChange={onChangeInput}
              className={css.input_change}
            />
          </label>

          <label>
            Email:
            <input
              type="text"
              name="email"
              value={order.email}
              onChange={onChangeInput}
              className={css.input_change}
            />
          </label>

          <label>
            Phone:
            <input
              type="number"
              name="phone"
              value={order.phone}
              onChange={onChangeInput}
              className={css.input_change}
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={order.address}
              onChange={onChangeInput}
              className={css.input_change}
            />
          </label>
        </div>

        <div className={css.right_container}>
          <ul>
            {cart &&
              cart?.map(({ name, price, id, count, pharmacy }) => (
                <li key={id} className={css.item}>
                  <h4 className={css.item_title}>{pharmacy}</h4>
                  <h2>{name}</h2>
                  <p>price: {price} $</p>
                  <div className={css.input_container}>
                    <label>
                      <input
                        type="number"
                        name="count"
                        value={cart.find((product) => product.id === id).count}
                      />
                    </label>
                    <div className={css.span_container}>
                      <span
                        onClick={() => handleCauntDecrement(id)}
                        className={css.span}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => handleCauntIncrement(count, id)}
                        className={css.span}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                  <h3>sum: {price * count}</h3>

                  <button
                    type="button"
                    onClick={() => handleMedicinesDelete(id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>

          <div className={css.footer}>
            <button className={css.btn}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ShoppingCartPage;
