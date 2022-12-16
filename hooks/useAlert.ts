import { useEffect, useState } from "react";
import { message } from "antd";
import { Alert } from "@/models/common";

export const useAlert = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [alert, setAlert] = useState<Alert>();
  useEffect(() => {
    if (alert) {
      messageApi.open({
        type: alert?.type,
        content: alert?.msg,
      });
    }
  }, [alert]);
  return {
    contextHolder,
    setAlert: setAlert,
  };
};
