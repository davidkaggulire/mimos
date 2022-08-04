import "../styles/globals.css";

import "react-toastify/dist/ReactToastify.min.css";
import SocketProvider from "../store/SocketProvider";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />

  return <SocketProvider>
    <Component {...pageProps} />
  </SocketProvider>

  // return (
  //   <>
  //     <Provider store={store}>
  //       <Component {...pageProps} />
  //     </Provider>
  //   </>
  // );
}

export default MyApp;
