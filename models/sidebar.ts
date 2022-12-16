import React, { ReactElement } from "react";


export interface itemSideBar {
    key:string;
    label: string|ReactElement;
    icon?:ReactElement;

}