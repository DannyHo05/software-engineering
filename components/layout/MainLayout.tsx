import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DownOutlined,
  LaptopOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
  SmileOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space, Spin } from "antd";
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
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { ProfileType, SideBarType } from "@/models/common";
import { SideBarOptions } from "@/utils/enum";
import { useAlert } from "@/hooks";
const { Header, Content, Sider } = Layout;




const imgElement = (src: StaticImageData, name: string) => (
  <Image src={src} priority alt={name} width={24} height={24}></Image>
);



export const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const {profile,mutate} = useAuth()
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState("home");
  const [sidebar, setSidebar] = useState<itemSideBar[]>([])
  let itemSideBar: itemSideBar[] = [
    {
      label: (<div onClick={()=>{router.replace('/home')}}>Trang chủ</div>),
      icon: imgElement(home, "home_icon"),
      key: "home",
    },
    {
      label: (<div onClick={()=>{
        router.replace('/ListTopic')}}>Danh sách đề tài</div>),
      icon: imgElement(listTopic, "list_icon"),
      key: "ListTopic",
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
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>Thông tin cá nhân</div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={()=>logout()}>Đăng xuất</div>
      ),
      icon: <LogoutOutlined />,
      danger: true
    },
  ];
  useEffect(()=>{
    const newSidebar = profile?.data.function?.filter((value:SideBarType) => {
      return SideBarOptions[value]?.title      
    })?.map((value:SideBarType)=>{
      return{
        label:(<div onClick={()=>{
          router.replace(`/${SideBarOptions[value]?.link}`)}}>{SideBarOptions[value]?.title}</div>),
        icon:<PlusCircleOutlined />,
        key:value
      }
    })
    setSidebar(newSidebar)
  },[profile])
  useEffect(() => {
    setTab(router.asPath.split('/')[1])
    if (!Cookies.get("token")) {
      router.replace("/auth/login");
    }
  }, []);
  const logout = ()=>{
    Cookies.remove("token");
    mutate(null)
    router.replace("/auth/login");
  }
  return(profile?.data?.function ? (<div className="h-screen overflow-x-hidden bg-[#fafafa]">
  <div
    className="w-screen h-32"
    style={{
      backgroundColor: "#599EE7",
    }}
  >
    <Image
      style={{
        objectFit: "contain",
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
          Danh mục
        </Typography.Title>
      </div>
      
      {sidebar ? (<Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[tab]}
        items={[...itemSideBar, ...sidebar]}
        className="bg-[#fafafa] text-black"
      />):<Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[tab]}
      items={[...itemSideBar]}
      className="bg-[#fafafa] text-black"
    />}
    </Sider>
    <Layout className="site-layout">
      <Header
        className="site-layout-background flex justify-between items-center"
        style={{ paddingRight: "16px" }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
        )}

        <Dropdown menu={{ items }}>
          <div onClick={(e) => e.preventDefault()}>
            <Space>
            <span>{profile?.data?.name}</span>
            <Avatar size="small" icon={<UserOutlined />} />
            </Space>
          </div>
        </Dropdown>

        
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  </Layout>
</div>):(<div className="flex w-screen h-screen items-center justify-center">
  <Spin size="large"></Spin>
</div>))
    
};
