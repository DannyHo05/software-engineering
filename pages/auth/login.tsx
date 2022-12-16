import React, { useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo_spkt.jpg";
import { AuthLayout } from "@/components/layout";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import axiosClient from "@/api_app/AxiosClient";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { AuthApi } from "@/api_app";
import { useAlert } from "@/hooks";
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const Login = () => {
  const router = useRouter();
  const { setAlert, contextHolder } = useAlert();
  useEffect(() => {
    if (Cookies.get("token")) {
      router.replace("/home");
    }
  }, []);

  const onFinish = async (values: any) => {
    const payload = { username: values.username, password: values.password };
    const { data, status } = await AuthApi.login(payload);
    if (data) {
      console.log(data);
      if (data.status === true) {
        setAlert({ type: "success", msg: "Đăng nhập thành công!" });
        Cookies.set("token", data.token);
        router.replace("/home");
      } else {
        console.log(data.token);
        setAlert({ type: "error", msg: "Đăng nhập không thành công!" });
      }
    }
  };
  return (
    <div className="bg-black-200 p-3 w-screen h-screen flex justify-center items-center relative">
      {contextHolder}
      <div className=" opacity-30 bg-black absolute inset-0 -z-40 "></div>
      <div className="w-1/2 h-1/2 bg-white m-auto flex flex-col py-3 px-5 justify-center items-center rounded-md gap-6">
        <Image width={64} height={64} src={logo} alt="logo" />
        <div className="flex justify-between items-center w-full">
          <Form
            name="normal_login"
            className="w-1/2"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item className="flex flex-col">
              <Button
                htmlType="submit"
                type="primary"
                className=" bg-blue-600 w-full"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex items-center flex-col ml-6 justify-start w-1/2 h-full">
            <Typography.Title
              level={5}
              style={{ margin: 0, marginBottom: "16px", fontWeight: "normal" }}
            >
              Log in using your account on:
            </Typography.Title>
            <Button
              type="primary"
              danger
              className="w-full flex items-center justify-between"
            >
              <GoogleOutlined />
              <div className=" flex-grow">Google</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.Layout = AuthLayout;

export default Login;
