import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../shared/context/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <Component {...pageProps} />;
    </AuthContext>
  );
}

export default MyApp;
