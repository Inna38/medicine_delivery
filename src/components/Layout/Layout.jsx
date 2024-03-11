import { NavLink, Outlet } from "react-router-dom";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.header}>
      <nav>
        <NavLink
          to="/"
          className={css.title}
          style={({ isActive }) => ({
            color: isActive ? "#f32e2e" : "black",
          })}
        >
          Shop
        </NavLink>
        <NavLink
          to="shoppingCart"
          className={css.title}
          style={({ isActive }) => ({
            color: isActive ? "#f32e2e" : "black",
          })}
        >
          Shopping cart
        </NavLink>
        <NavLink
          to="/history"
          className={css.title}
          style={({ isActive }) => ({
            color: isActive ? "#f32e2e" : "black",
          })}
        >
          History
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
