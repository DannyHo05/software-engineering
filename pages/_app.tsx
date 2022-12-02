import '../styles/globals.css';
import 'antd/dist/antd'
// require("../styles/variables.less");
import { EmptyLayout } from '@/components/layout';
import { AppPropsWithLayout } from '@/models/common';
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
