import { Global } from "@emotion/react";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import CarDetails from "./pages/CarDetails/CarDetails";
import Favorites from "./pages/Favorites/Favorites";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import About from "./pages/About/About";
import HowToBuy from "./pages/HowToBuy/HowToBuy";
import NotFound from "./pages/NotFound/NotFound";
import { StoreProvider } from "./stores/context";
import { GLOBAL_STYLES } from "./styles/global.styles";

const App: FC = () => (
  <StoreProvider>
    <Global styles={GLOBAL_STYLES} />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
