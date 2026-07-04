import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

/** Прокручивает страницу наверх при переходе по маршрутам. */
const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/** Общий каркас: фиксированная шапка, контент маршрута и подвал. */
const Layout: FC = () => {
  const { pathname } = useLocation();
  return (
    <div css={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <Navbar />
      <main css={{ flex: 1 }}>
        {/* key по маршруту сбрасывает состояние ошибки при переходе на другую страницу. */}
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
