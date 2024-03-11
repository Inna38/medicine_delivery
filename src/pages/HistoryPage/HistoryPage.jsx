import { useEffect, useState } from "react";
import css from "./HistoryPage.module.css";
import { getOrder } from "../../services/http/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HistoryPage = () => {
  const [historyOrder, setHistoryOrder] = useState({
    email: "",
  });
  const [data, setData] = useState([]);

  const [filterData, setFilterData] = useState([]);

  const handleChangeHistoryOrder = async ({ target }) => {
    const { name, value } = target;

    setHistoryOrder({
      ...historyOrder,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (historyOrder.email.length === 0) {
      return;
    }

    try {
      const respons = await getOrder();
      setData(respons);
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

  useEffect(() => {
    const search = data.filter(
      (item) =>
        item.email.toLowerCase() === historyOrder.email.toLowerCase().trim()
    );

    const results = search.map((item) => item).map(({ order }) => order);

    setFilterData(...results);
  }, [data]);

  return (
    <>
      <ToastContainer />
      <form className={css.form} onClick={handleSubmit}>
        <label className={css.label}>
          Email:
          <input
            type="text"
            name="email"
            value={historyOrder.email}
            onChange={handleChangeHistoryOrder}
            className={css.inputHistory}
          />
        </label>

        <button className={css.btn}>Submit</button>
      </form>
      <ul>
        {filterData &&
          filterData.map(({ name, count, pharmacy, price, id }) => (
            <li key={id} className={css.item}>
              <h2>{name}</h2>
              <p className={css.title}>count: {count}</p>
              <p className={css.title}>pharmacy: {pharmacy}</p>
              <p className={css.title}>price: {price} $</p>

              <p>sum: {count * price}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HistoryPage;
