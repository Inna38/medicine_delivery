import { useEffect, useState } from "react";
import { getAll } from "../../services/http/http";
import { NavLink, Outlet } from "react-router-dom";
import css from "./MainPage.module.css";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = (async () => {
      try {
        const data = await getAll();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.left_container}>
        <h1 className={css.title}>Shops:</h1>
        {isLoading && <h1>LOADING...</h1>}
        <ul>
          {data?.map(({ _id, analgesics, pharmacy }) => (
            <li key={_id}>
              <NavLink to={`/${_id}`}>
                <button type="button" className={css.btn}>
                  {pharmacy}
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.right_container}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
