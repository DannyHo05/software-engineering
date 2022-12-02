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