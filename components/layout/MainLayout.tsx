import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAcceptCookies } from "@/hooks";
import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import desktop from "@/assets/images/desktop.jpg";
import Image, { StaticImageData } from "next/image";
import { itemSideBar } from "@/models/sidebar";
import home from "@/assets/images/house-icon.png";
import listTopic from "@/assets/images/Actions-view-calendar-list-icon.png";
import teacher from "@/assets/images/Teacher-icon.png";
import help from "@/assets/images/Actions-help-contents-icon.png";
import chartIcon from "@/assets/images/chart-icon.png";
import search from "@/assets/images/Search-icon.png";
import logo from "../../assets/images/bg_body.jpg";
const { Header, Content, Sider } = Layout;
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const imgElement = (src: StaticImageData, name: string) => (
  <Image src={src} priority alt={name} width={24} height={24}></Image>
);

const itemSidebar: itemSideBar[] = [
  {
    label: "Trang Chủ",
    icon: imgElement(home, "home_icon"),
    key: "home",
  },
  {
    label: "Danh sách đề tài",
    icon: imgElement(listTopic, "list_icon"),
    key: "listTopic",
  },
  {
    label: "Thông tin giảng viên",
    icon: imgElement(teacher, "teacher_icon"),
    key: "lecturers",
  },
  {
    label: "Hướng dẫn đăng ký",
    icon: imgElement(help, "help_icon"),
    key: "doc",
  },
  {
    label: "Thống kê",
    icon: imgElement(chartIcon, "chart_icon"),
    key: "Statistical",
  },
  {
    label: "Tìm kiếm",
    icon: imgElement(search, "search_icon"),
    key: "search",
  },
];

const items2: MenuProps["items"] = itemSidebar;
export const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="h-screen overflow-x-hidden bg-[#fafafa]">
      {/* <Layout className="bg-[#fafafa]">
        <Header
          className=""
          style={{
            height: "fit-content",
            padding: 0,
          }}
        >
          <div className="w-screen h-32 ">
            <Image
              objectFit="cover"
              src={desktop}
              alt=""
              className="w-full h-full"
            />
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background bg-[#fafafa]"
            style={{ padding: "24px 0" }}
          >
            <Sider
              className="site-layout-background rounded-lg overflow-hidden"
              width={250}
              style={{ border: "1px solid #ccc" }}
            >
              <Header
                className="flex items-center w-full"
                style={{
                  background: "#fff",
                  padding: "34px 24px",
                  borderBottom: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{ margin: 0, color: "#000" }}
                >
                  Danh Mục
                </Typography.Title>
              </Header>
              <Menu
                mode="inline"
                defaultSelectedKeys={["home"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                className="text-[16px]"
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              Content
            </Content>
          </Layout>
        </Content>
      </Layout> */}
      <div className="w-screen h-32" style={{
        backgroundColor:"#599EE7"
      }}>
        <Image
          style={{
            objectFit: "contain"
          }}
          src={desktop}
          alt=""
          className="w-full h-full"
        />
      </div>
      <Layout className="bg-[#fafafa] min-h-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "#fafafa" }}
          width={250}
        >
          <div className="logo">
            {/* <Image width={64} height={64} src={logo} alt="logo" /> */}
            <Typography.Title level={5} style={{ margin: 0, color: "#000" }}>
              Danh Mục
            </Typography.Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["home"]}
            items={itemSidebar}
            className="bg-[#fafafa] text-black"
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
