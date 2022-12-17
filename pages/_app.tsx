import "../styles/globals.css";
import "antd/dist/antd";
// require("../styles/variables.less");
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models/common";
import { SWRConfig } from "swr";
import axiosClient from "@/api_app/AxiosClient";
import { useAlert } from "@/hooks";
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  const {setAlert, contextHolder} = useAlert()
  return (
    <SWRConfig
      value={{ refreshInterval: 600000, shouldRetryOnError:false, fetcher: (url) => axiosClient.get(url) }}
    >
      <Layout>
        {contextHolder}
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
