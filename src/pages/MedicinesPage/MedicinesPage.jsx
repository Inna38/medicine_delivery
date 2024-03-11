import { useEffect, useState } from "react";
import { getMedicinesId } from "../../services/http/http";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import css from "./MedicinesPage.module.css";

const MedicinesPage = () => {
  const { id } = useParams();
  const notify = (message) => toast(message);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState([]);

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
  });

  useEffect(() => {
    const fetchData = (async () => {
      try {
        const data = await getMedicinesId(id);
        setData([data]);
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
    })();
  }, [id]);

  const handleCartClick = (name, pharmacy, price, count = 1) => {
    if (cart) {
      const savedValid = cart.find((cart, pharmacy) => cart.name === name);
      if (savedValid) {
        toast.error("The medicine has already been added to the cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    setCart((prev) => [
      ...prev,
      { name, count, pharmacy, price, id: nanoid() },
    ]);

    notify("Successfully added to cart");
  };

  const handleSortButton = () => {
    const [dataSort] = data.map(({ analgesics }) => analgesics);
    const sort = dataSort.sort((a, b) => (a.price > b.price ? 1 : -1));

    setSort(sort);
  };

  return (
    <div>
      {console.log(
        "cart",
        data.map(() => console.log(console.log(data)))
      )}
      {localStorage.setItem("cart", JSON.stringify(cart))}
      <ToastContainer />
      {data &&
        data?.map(({ analgesics, pharmacy, _id }) => (
          <>
            <h1 className={css.title}>{pharmacy}</h1>
            <div className={css.footer}>
              <button
                type="button"
                onClick={handleSortButton}
                className={css.btn}
              >
                Sort by price
              </button>
            </div>
            <ul key={_id} className={css.list}>
              {analgesics.map(({ name, price }) => (
                <li key={name} className={css.item}>
                  <h3>{name}</h3>
                  <p>price: {price} $</p>

                  <button
                    type="button"
                    onClick={() => handleCartClick(name, pharmacy, price)}
                    className={css.btn_cart}
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </>
        ))}
    </div>
  );
};

export default MedicinesPage;
