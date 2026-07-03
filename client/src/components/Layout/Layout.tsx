import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";

/** Прокручивает страницу наверх при переходе по маршрутам. */
const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/** Общий каркас: фиксированная шапка, контент маршрута и подвал. */
const Layout: FC = () => (
  <div css={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <ScrollToTop />
    <Navbar />
    <main css={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
