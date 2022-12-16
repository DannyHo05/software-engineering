import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface layoutPro{
    children:ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: (props: layoutPro) => ReactElement
  }
  
export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
  }

export type Alert = {
  msg:string,
   type: 'success'|'warning'|'error',
}

export type ProfileType = {
  role: string,
  function:string[],
  user_id:string,
  name:string,
  birthday:string,
  username:string,
  topicid:string,
  departmentid:string
}