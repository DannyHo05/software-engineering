import "../styles/globals.css";
import "antd/dist/antd";
// require("../styles/variables.less");
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models/common";
import { SWRConfig } from "swr";
import axiosClient from "@/api_app/AxiosClient";
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <SWRConfig
      value={{ refreshInterval: 60000, shouldRetryOnError:false, fetcher: (url) => axiosClient.get(url) }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
