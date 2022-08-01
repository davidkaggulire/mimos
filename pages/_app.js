import "../styles/globals.css";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />

  // return (
  //   <>
  //     <Provider store={store}>
  //       <Component {...pageProps} />
  //     </Provider>
  //   </>
  // );
}

export default MyApp;
