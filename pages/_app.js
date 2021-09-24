import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../shared/context/auth-context";
import { useAuth } from "../shared/hooks/auth-hook";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout, userId }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
