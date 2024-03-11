import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import MedicinesPage from "./pages/MedicinesPage/MedicinesPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />}>
            <Route path=":id" element={<MedicinesPage />} />
          </Route>

          <Route path="/shoppingCart" element={<ShoppingCartPage />} />

          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
