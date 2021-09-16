import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../shared/context/auth-context";
import { useAuth } from "../shared/hooks/auth-hook";

function MyApp({ Component, pageProps }) {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      <Component {...pageProps} />;
    </AuthContext.Provider>
  );
}

export default MyApp;
