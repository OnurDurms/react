import '../styles/globals.css'
import Layout from './components/layout'
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (<Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>)
}

export default wrapper.withRedux(MyApp);